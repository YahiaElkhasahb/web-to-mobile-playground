import * as SQLite from 'expo-sqlite';
import { Job, SyncItem } from '@/types';

let db: SQLite.SQLiteDatabase;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('fieldops.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS pending_uploads (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        job_id TEXT NOT NULL,
        payload TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );
    `);
  }
  return db;
}

export async function upsertJob(job: Job) {
  const d = await getDb();
  await d.runAsync(
    'INSERT OR REPLACE INTO jobs (id, data, updated_at) VALUES (?, ?, ?)',
    [job.id, JSON.stringify(job), new Date().toISOString()]
  );
}

export async function getJobs(): Promise<Job[]> {
  const d = await getDb();
  const rows = await d.getAllAsync<{ data: string }>('SELECT data FROM jobs ORDER BY updated_at DESC');
  return rows.map((r) => JSON.parse(r.data));
}

export async function getJob(id: string): Promise<Job | null> {
  const d = await getDb();
  const row = await d.getFirstAsync<{ data: string }>('SELECT data FROM jobs WHERE id = ?', [id]);
  return row ? JSON.parse(row.data) : null;
}

export async function updateJobLocal(id: string, patch: Partial<Job>) {
  const job = await getJob(id);
  if (!job) return;
  await upsertJob({ ...job, ...patch, updatedAt: new Date().toISOString() });
}

export async function enqueue(item: Omit<SyncItem, 'attempts' | 'status'>) {
  const d = await getDb();
  await d.runAsync(
    'INSERT OR IGNORE INTO pending_uploads (id, type, job_id, payload, status, attempts, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [item.id, item.type, item.job_id, item.payload, 'pending', 0, item.created_at]
  );
}

export async function getPending(): Promise<SyncItem[]> {
  const d = await getDb();
  return d.getAllAsync<SyncItem>(
    "SELECT * FROM pending_uploads WHERE status != 'sent' AND attempts < 5 ORDER BY created_at ASC"
  );
}

export async function markSent(id: string) {
  const d = await getDb();
  await d.runAsync("UPDATE pending_uploads SET status = 'sent' WHERE id = ?", [id]);
}

export async function markFailed(id: string) {
  const d = await getDb();
  await d.runAsync(
    "UPDATE pending_uploads SET status = 'failed', attempts = attempts + 1 WHERE id = ?",
    [id]
  );
}

export async function getPendingCount(): Promise<number> {
  const d = await getDb();
  const row = await d.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM pending_uploads WHERE status = 'pending'"
  );
  return row?.count ?? 0;
}
