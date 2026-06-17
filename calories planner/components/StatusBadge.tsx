import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { JobStatus } from '@/types';

const CONFIG: Record<JobStatus, { label: string; color: string; bg: string }> = {
  assigned:  { label: 'Assigned',  color: '#374151', bg: '#f3f4f6' },
  en_route:  { label: 'En Route',  color: '#92400e', bg: '#fef3c7' },
  on_site:   { label: 'On Site',   color: '#1d4ed8', bg: '#dbeafe' },
  complete:  { label: 'Complete',  color: '#14532d', bg: '#dcfce7' },
};

export function StatusBadge({ status }: { status: JobStatus }) {
  const c = CONFIG[status] ?? CONFIG.assigned;
  return (
    <View style={[s.badge, { backgroundColor: c.bg }]}>
      <Text style={[s.text, { color: c.color }]}>{c.label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { borderRadius: 6, paddingHorizontal: 9, paddingVertical: 3 },
  text:  { fontSize: 12, fontWeight: '600' },
});
