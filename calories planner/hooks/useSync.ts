import { useState, useEffect, useCallback } from 'react';
import { getPendingCount } from '@/services/db';
import { runSync, startNetworkListener } from '@/services/syncQueue';

export function useSync() {
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const refresh = useCallback(async () => {
    setPendingCount(await getPendingCount());
  }, []);

  const triggerSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      await runSync();
      await refresh();
    } finally {
      setIsSyncing(false);
    }
  }, [refresh]);

  useEffect(() => {
    refresh();
    return startNetworkListener(refresh);
  }, [refresh]);

  return { pendingCount, isSyncing, triggerSync, refresh };
}
