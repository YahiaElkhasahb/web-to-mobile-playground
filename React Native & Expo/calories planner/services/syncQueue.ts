import NetInfo from '@react-native-community/netinfo';
import { getPending, markSent, markFailed } from './db';
import { jobsApi } from './api';
import { SyncItem } from '@/types';

let running = false;

async function processItem(item: SyncItem) {
  const p = JSON.parse(item.payload);
  switch (item.type) {
    case 'status_update': await jobsApi.updateStatus(item.job_id, p.status); break;
    case 'note': await jobsApi.addNote(item.job_id, p.note); break;
    case 'photo': await jobsApi.uploadPhoto(item.job_id, p.uri); break;
    case 'checkin': await jobsApi.checkin(item.job_id, p.latitude, p.longitude); break;
  }
}

export async function runSync() {
  if (running) return { sent: 0, failed: 0 };
  const net = await NetInfo.fetch();
  if (!net.isConnected) return { sent: 0, failed: 0 };

  running = true;
  let sent = 0, failed = 0;
  try {
    const items = await getPending();
    for (const item of items) {
      try {
        await processItem(item);
        await markSent(item.id);
        sent++;
      } catch {
        await markFailed(item.id);
        failed++;
      }
    }
  } finally {
    running = false;
  }
  return { sent, failed };
}

export function startNetworkListener(onSync?: (r: { sent: number; failed: number }) => void) {
  return NetInfo.addEventListener((state) => {
    if (state.isConnected) runSync().then((r) => r.sent > 0 && onSync?.(r));
  });
}
