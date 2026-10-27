import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import type { DbClient } from '../db.js';
import type express from 'express';
import { createTestDb } from '../test-support/test-db.js';
import { createApp } from '../app.js';
import { createUser } from '../db/users.js';
import { createWorkspace, addWorkspaceUser } from '../db/workspaces.js';
import { signSession } from '../auth/session.js';
import { SESSION_COOKIE_NAME } from '../middleware/require-auth.js';
import { findConnector as findAnyConnector, type HttpConnector } from '../db/connectors.js';

const findConnector = async (...args: Parameters<typeof findAnyConnector>) => (await findAnyConnector(...args)) as HttpConnector | undefined;

const SECRET = 'test-secret-at-least-16-chars';
let db: DbClient;
let workspaceId: string;
let ownerCookie: string;
let memberCookie: string;
let strangerCookie: string;

function cookieFor(userId: string, activeWorkspaceId: string) {
  return `${SESSION_COOKIE_NAME}=${signSession({ userId, activeWorkspaceId, issuedAt: Date.now() }, SECRET)}`;
}

beforeEach(async () => {
  db = await createTestDb();
  const owner = await createUser(db, { email: 'owner@x.com', passwordHash: 'h', name: 'Owner' });
  const member = await createUser(db, { email: 'member@x.com', passwordHash: 'h', name: 'Member' });
  const stranger = await createUser(db, { email: 'stranger@x.com', passwordHash: 'h', name: 'Stranger' });
  const workspace = await createWorkspace(db, 'W1');
  await addWorkspaceUser(db, { workspaceId: workspace.id, userId: owner.id, role: 'owner' });
  await addWorkspaceUser(db, { workspaceId: workspace.id, userId: member.id, role: 'member' });
  workspaceId = workspace.id;
  ownerCookie = cookieFor(owner.id, workspace.id);
  memberCookie = cookieFor(member.id, workspace.id);
  strangerCookie = cookieFor(stranger.id, workspace.id);
});

const CSDL = `<?xml version="1.0"?><edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"><edmx:DataServices>
  <Schema Namespace="Plant" xmlns="http://docs.oasis-open.org/odata/ns/edm">
    <EntityType Name="Pump"><Key><PropertyRef Name="Id"/></Key><Property Name="Id" Type="Edm.Int64" Nullable="false"/><Property Name="Flow" Type="Edm.Double"/></EntityType>
    <EntityContainer Name="C"><EntitySet Name="Pumps" EntityType="Plant.Pump"/><EntitySet Name="Lines" EntityType="Plant.Pump"/></EntityContainer>
  </Schema></edmx:DataServices></edmx:Edmx>`;

interface Read {
  url: string;
  accept: string;
  auth: string;
}

/** An app whose sources answer the way a service does: the document as XML, anything else not found. */
function serviceApp(reads: Read[] = [], answer: () => Response = () => new Response(CSDL, { headers: { 'Content-Type': 'application/xml' } })) {
  return createApp({
    db,
    sessionSecret: SECRET,
    connectorFetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      reads.push({ url: String(input), accept: headers.get('Accept') ?? '', auth: headers.get('Authorization') ?? '' });
      return String(input).endsWith('/$metadata') ? answer() : new Response('{}', { status: 404, headers: { 'Content-Type': 'application/json' } });
    },
  });
}

const create = (a: express.Express, extra: object = {}) =>
  request(a)
    .post(`/api/workspaces/${workspaceId}/connectors`)
    .set('Cookie', ownerCookie)
    .send({ name: 'Plant', baseUrl: 'https://plant.example.com/odata', authType: 'bearer', authValue: 'key-1', descriptionDocument: { kind: 'odata', path: '/$metadata' }, ...extra });

const catalog = (a: express.Express, id: string, query = '') =>
  request(a).get(`/api/workspaces/${workspaceId}/connectors/${id}/catalog${query}`).set('Cookie', memberCookie);

describe('a source’s description document', () => {
  it('is stored with the source, listed with it, changed and cleared by its owner', async () => {
    const a = serviceApp();
    const created = await create(a);
    expect(created.status).toBe(201);
    expect(created.body.descriptionDocument).toEqual({ kind: 'odata', path: '/$metadata' });
    const listed = await request(a).get(`/api/workspaces/${workspaceId}/connectors`).set('Cookie', memberCookie);
    expect(listed.body.connectors[0].descriptionDocument).toEqual({ kind: 'odata', path: '/$metadata' });
    const changed = await request(a)
      .put(`/api/workspaces/${workspaceId}/connectors/${created.body.id}`)
      .set('Cookie', ownerCookie)
      .send({ descriptionDocument: { kind: 'openapi', path: '/openapi.json' } });
    expect(changed.body.descriptionDocument).toEqual({ kind: 'openapi', path: '/openapi.json' });
    // Left alone by a change that does not name it; cleared by null.
    const renamed = await request(a).put(`/api/workspaces/${workspaceId}/connectors/${created.body.id}`).set('Cookie', ownerCookie).send({ name: 'Plant 2' });
    expect(renamed.body.descriptionDocument).toEqual({ kind: 'openapi', path: '/openapi.json' });
    const cleared = await request(a).put(`/api/workspaces/${workspaceId}/connectors/${created.body.id}`).set('Cookie', ownerCookie).send({ descriptionDocument: null });
    expect(cleared.body).not.toHaveProperty('descriptionDocument');
    expect((await findConnector(db, workspaceId, created.body.id))!.descriptionDocument).toBeUndefined();
  });

  it('is refused unless it is a known kind and a path under the source — never an address of its own', async () => {
    const a = serviceApp();
    for (const bad of [
      { kind: 'wsdl', path: '/x' },
      { kind: 'odata' },
      { path: '/x' },
      { kind: 'odata', path: 'x' },
      { kind: 'odata', path: '//evil.example.com/x' },
      { kind: 'odata', path: 'https://evil.example.com/$metadata' },
      { kind: 'odata', path: '/a/../b' },
      { kind: 'odata', path: '/a b' },
      { kind: 'odata', path: '/x#frag' },
      { kind: 'odata', path: `/${'a'.repeat(600)}` },
      { kind: 'odata', path: '/x', extra: 1 },
      'text',
      [],
    ]) {
      expect((await create(a, { descriptionDocument: bad })).status, JSON.stringify(bad)).toBe(400);
    }
  });

  it('is not a setting of a static source', async () => {
    const a = serviceApp();
    const res = await request(a)
      .post(`/api/workspaces/${workspaceId}/connectors`)
      .set('Cookie', ownerCookie)
      .send({ name: 'Table', type: 'static', descriptionDocument: { kind: 'odata', path: '/$metadata' } });
    expect(res.status).toBe(400);
  });
});

describe('the catalog made from a source’s description document', () => {
  it('answers a page of what the source says about itself, read with the source’s credential', async () => {
    const reads: Read[] = [];
    const a = serviceApp(reads);
    const { body: source } = await create(a);
    const res = await catalog(a, source.id);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      kind: 'odata',
      title: 'Plant',
      total: 2,
      offset: 0,
      entries: [
        { path: '/Pumps', shape: 'set', key: ['Id'], fieldCount: 2 },
        { path: '/Lines', shape: 'set', key: ['Id'], fieldCount: 2 },
      ],
    });
    expect(reads).toEqual([{ url: 'https://plant.example.com/odata/$metadata', accept: expect.stringMatching(/^application\/xml/), auth: 'Bearer key-1' }]);
    expect(JSON.stringify(res.body)).not.toContain('key-1');
  });

  it('pages the entries, and answers one entry whole', async () => {
    const a = serviceApp();
    const { body: source } = await create(a);
    expect((await catalog(a, source.id, '?offset=1&limit=1')).body.entries.map((e: { path: string }) => e.path)).toEqual(['/Lines']);
    const one = await catalog(a, source.id, `?entry=${encodeURIComponent('/Pumps')}`);
    expect(one.body.entry).toMatchObject({ path: '/Pumps', key: ['Id'], fields: [{ name: 'Id', type: 'Edm.Int64' }, { name: 'Flow', type: 'Edm.Double', nullable: true }] });
    expect((await catalog(a, source.id, '?entry=/Nope')).status).toBe(404);
    for (const bad of ['?limit=0', '?limit=500', '?offset=-1', '?offset=x']) expect((await catalog(a, source.id, bad)).status, bad).toBe(400);
  });

  it('reads the document once for the people who ask within a short while', async () => {
    const reads: Read[] = [];
    const a = serviceApp(reads);
    const { body: source } = await create(a);
    await Promise.all([catalog(a, source.id), catalog(a, source.id), catalog(a, source.id)]);
    await catalog(a, source.id, '?offset=1');
    expect(reads).toHaveLength(1);
  });

  it('reads it again after the source’s settings change', async () => {
    const reads: Read[] = [];
    const a = serviceApp(reads);
    const { body: source } = await create(a);
    await catalog(a, source.id);
    await request(a).put(`/api/workspaces/${workspaceId}/connectors/${source.id}`).set('Cookie', ownerCookie).send({ authType: 'bearer', authValue: 'key-2' });
    await catalog(a, source.id);
    expect(reads.map(r => r.auth)).toEqual(['Bearer key-1', 'Bearer key-2']);
  });

  it('says so when the source names no description document, and does not touch the source', async () => {
    const reads: Read[] = [];
    const a = serviceApp(reads);
    const { body: source } = await create(a, { descriptionDocument: undefined });
    const res = await catalog(a, source.id);
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ code: 'NO_DESCRIPTION_DOCUMENT' });
    expect(reads).toEqual([]);
  });

  it('says what went wrong when the document cannot be read, without the credential — and asks again next time', async () => {
    let answering: () => Response = () => new Response('Forbidden', { status: 403 });
    const a = serviceApp([], () => answering());
    const { body: source } = await create(a);
    const refused = await catalog(a, source.id);
    expect(refused.status).toBe(502);
    expect(refused.body).toMatchObject({ code: 'DESCRIPTION_UNREADABLE', status: 403, message: 'upstream responded 403' });
    expect(JSON.stringify(refused.body)).not.toContain('key-1');
    answering = () => new Response('<html><body/></html>', { headers: { 'Content-Type': 'text/html' } });
    const html = await catalog(a, source.id);
    expect(html.status).toBe(502);
    expect(html.body.message).toMatch(/not an OData \$metadata/);
    answering = () => new Response(CSDL, { headers: { 'Content-Type': 'application/xml' } });
    expect((await catalog(a, source.id)).status).toBe(200);
  });

  it('refuses a document larger than the catalog reads', async () => {
    const a = serviceApp([], () => new Response('x'.repeat(4_000_001), { headers: { 'Content-Type': 'application/xml' } }));
    const { body: source } = await create(a);
    const res = await catalog(a, source.id);
    expect(res.status).toBe(502);
    expect(res.body.message).toMatch(/larger than the catalog reads/);
  });

  it('is for the workspace’s members, and a source that is not found is not found', async () => {
    const a = serviceApp();
    const { body: source } = await create(a);
    expect((await request(a).get(`/api/workspaces/${workspaceId}/connectors/${source.id}/catalog`).set('Cookie', strangerCookie)).status).toBe(403);
    expect((await catalog(a, '00000000-0000-0000-0000-000000000000')).status).toBe(404);
  });
});
