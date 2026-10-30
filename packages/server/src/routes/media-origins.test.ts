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
import { createBoard } from '../db/boards.js';
import { mediaOriginsFromEnv } from '../media-origins.js';

// `UBOARD_MEDIA_ORIGINS`: the origins the widgets of a board may load media from. A viewer is told only when the
// operator set some — nothing is said (and nothing limited) otherwise.

const SECRET = 'test-secret-at-least-16-chars';
let db: DbClient;
let workspaceId: string;
let boardId: string;
let ownerCookie: string;

beforeEach(async () => {
  db = await createTestDb();
  const owner = await createUser(db, { email: 'owner@x.com', passwordHash: 'h', name: 'Owner' });
  const workspace = await createWorkspace(db, 'W1');
  await addWorkspaceUser(db, { workspaceId: workspace.id, userId: owner.id, role: 'owner' });
  workspaceId = workspace.id;
  boardId = (await createBoard(db, { actorUserId: owner.id, workspaceId, name: 'B' })).id;
  ownerCookie = `${SESSION_COOKIE_NAME}=${signSession({ userId: owner.id, activeWorkspaceId: workspace.id, issuedAt: Date.now() }, SECRET)}`;
});

async function answers(mediaOrigins: string[] | undefined) {
  const app: express.Express = createApp({ db, sessionSecret: SECRET, mediaOrigins });
  const read = await request(app).get(`/api/workspaces/${workspaceId}/boards/${boardId}`).set('Cookie', ownerCookie);
  const { body: link } = await request(app).post(`/api/workspaces/${workspaceId}/boards/${boardId}/share-tokens`).set('Cookie', ownerCookie);
  const shared = await request(app).get(`/api/share/boards/${boardId}`).set('Authorization', `Bearer ${link.token}`);
  return { read, shared };
}

describe('mediaOrigins in board answers', () => {
  it('tells a viewer — an editor and a share link alike — which origins media may load from', async () => {
    const { read, shared } = await answers(['self', 'https://cdn.example.com']);
    expect(read.status).toBe(200);
    expect(shared.status).toBe(200);
    expect(read.body.mediaOrigins).toEqual(['self', 'https://cdn.example.com']);
    expect(shared.body.mediaOrigins).toEqual(['self', 'https://cdn.example.com']);
  });

  it('closes media to the page’s own origin when the operator set none', async () => {
    const { read, shared } = await answers(undefined);
    expect(read.body.mediaOrigins).toEqual(['self']);
    expect(shared.body.mediaOrigins).toEqual(['self']);
  });

  it('can allow nothing at all', async () => {
    const { read, shared } = await answers([]);
    expect(read.body.mediaOrigins).toEqual([]);
    expect(shared.body.mediaOrigins).toEqual([]);
  });
});

describe('mediaOriginsFromEnv', () => {
  it('reads origins separated by commas or spaces, and "self"; "self" alone when unset or empty', () => {
    expect(mediaOriginsFromEnv(undefined)).toEqual(['self']);
    expect(mediaOriginsFromEnv('')).toEqual(['self']);
    expect(mediaOriginsFromEnv('  , ')).toEqual(['self']);
    expect(mediaOriginsFromEnv('none')).toEqual([]);
    expect(mediaOriginsFromEnv('self, https://a.example.com  http://media.example.net:8080')).toEqual([
      'self',
      'https://a.example.com',
      'http://media.example.net:8080',
    ]);
  });

  it.each(['*', 'none https://a.example.com', 'ftp://a.example.com', 'https://a.example.com/', 'https://a.example.com/img', 'a.example.com', 'https://a.example.com:443', 'Self'])('refuses %s', origin => {
    expect(() => mediaOriginsFromEnv(origin)).toThrow(/UBOARD_MEDIA_ORIGINS/);
  });
});
