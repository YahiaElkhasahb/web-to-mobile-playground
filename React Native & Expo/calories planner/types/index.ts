export type UserRole = 'technician' | 'manager';

export type JobStatus = 'assigned' | 'en_route' | 'on_site' | 'complete';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Part {
  id: string;
  name: string;
  quantity: number;
  used: boolean;
}

export interface Job {
  id: string;
  customerName: string;
  address: string;
  scheduledTime: string;
  jobType: string;
  status: JobStatus;
  assignedTo: string;
  notes: string;
  photos: string[];
  parts: Part[];
  signatureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type SyncItemType = 'status_update' | 'note' | 'photo' | 'signature' | 'checkin';

export interface SyncItem {
  id: string;
  type: SyncItemType;
  job_id: string;
  payload: string;
  status: 'pending' | 'failed' | 'sent';
  attempts: number;
  created_at: string;
}

export interface DashboardData {
  totalJobs: number;
  openJobs: number;
  inProgressJobs: number;
  completedJobs: number;
  technicians: Array<{
    id: string;
    name: string;
    activeJob?: Job;
    lastSeen: string;
  }>;
}
