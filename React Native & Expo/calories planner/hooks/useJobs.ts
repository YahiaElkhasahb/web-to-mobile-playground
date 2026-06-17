import { useQuery } from '@tanstack/react-query';
import { upsertJob, getJobs, getJob } from '@/services/db';
import { Job } from '@/types';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    customerName: 'John Smith',
    address: '123 Main St, Springfield',
    scheduledTime: new Date().toISOString(),
    jobType: 'HVAC Repair',
    status: 'assigned',
    assignedTo: 'tech1',
    notes: '',
    photos: [],
    parts: [
      { id: 'p1', name: 'Air Filter', quantity: 2, used: false },
      { id: 'p2', name: 'Capacitor', quantity: 1, used: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    address: '456 Oak Ave, Shelbyville',
    scheduledTime: new Date().toISOString(),
    jobType: 'Plumbing',
    status: 'en_route',
    assignedTo: 'tech1',
    notes: 'Customer reported leak under sink.',
    photos: [],
    parts: [
      { id: 'p3', name: 'P-Trap', quantity: 1, used: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    customerName: 'Mike Davis',
    address: '789 Pine Rd, Capital City',
    scheduledTime: new Date().toISOString(),
    jobType: 'Electrical',
    status: 'on_site',
    assignedTo: 'tech1',
    notes: 'Circuit breaker keeps tripping.',
    photos: [],
    parts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    customerName: 'Lisa Brown',
    address: '321 Elm St, Ogdenville',
    scheduledTime: new Date().toISOString(),
    jobType: 'HVAC Install',
    status: 'complete',
    assignedTo: 'tech1',
    notes: 'Installation completed successfully.',
    photos: [],
    parts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seedMockData() {
  const existing = await getJobs();
  if (existing.length === 0) {
    await Promise.all(MOCK_JOBS.map(upsertJob));
  }
}

export function useMyJobs() {
  return useQuery({
    queryKey: ['jobs', 'mine'],
    queryFn: async () => {
      await seedMockData();
      return getJobs();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJob(id),
    enabled: !!id,
  });
}

export function useAllJobs() {
  return useQuery({
    queryKey: ['manager', 'jobs'],
    queryFn: async () => {
      await seedMockData();
      return getJobs();
    },
  });
}
