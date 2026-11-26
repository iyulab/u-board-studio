import { PGlite } from '@electric-sql/pglite';
import { describe, expect, it } from 'vitest';

// An installation on the embedded database (`UBOARD_DATABASE_URL` naming a directory) keeps that directory
// across upgrades, and PostgreSQL opens only a directory made by its own major version. Every other test starts
// from an empty database, so nothing else here sees a new major. Raising this number needs a step that carries
// an existing directory's data across, and an "When upgrading" entry in the changelog.
const DATA_DIRECTORY_MAJOR = 18;

describe('the embedded database', () => {
  it('is the PostgreSQL major that made the data directory of an existing installation', async () => {
    const db = new PGlite();
    try {
      const { rows } = await db.query<{ server_version_num: string }>('SHOW server_version_num');
      expect(Math.floor(Number(rows[0]?.server_version_num) / 10_000)).toBe(DATA_DIRECTORY_MAJOR);
    } finally {
      await db.close();
    }
  });
});
