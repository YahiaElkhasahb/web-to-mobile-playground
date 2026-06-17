import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Job } from '@/types';
import { StatusBadge } from './StatusBadge';

interface Props { job: Job; onPress: (j: Job) => void; }

function fmtTime(iso: string) {
  try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  catch { return iso; }
}

export const JobCard = React.memo(function JobCard({ job, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [s.card, pressed && s.pressed]}
      onPress={() => onPress(job)}
    >
      <View style={s.row}>
        <Text style={s.customer} numberOfLines={1}>{job.customerName}</Text>
        <StatusBadge status={job.status} />
      </View>
      <Text style={s.address} numberOfLines={1}>{job.address}</Text>
      <View style={s.row}>
        <Text style={s.type}>{job.jobType}</Text>
        <Text style={s.time}>{fmtTime(job.scheduledTime)}</Text>
      </View>
    </Pressable>
  );
});

const s = StyleSheet.create({
  card:    { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginHorizontal: 12, marginVertical: 5, elevation: 1, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  pressed: { opacity: 0.85 },
  row:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  customer:{ fontSize: 15, fontWeight: '600', color: '#111827', flex: 1, marginRight: 8 },
  address: { fontSize: 13, color: '#6b7280', marginBottom: 10 },
  type:    { fontSize: 12, color: '#6b7280' },
  time:    { fontSize: 13, fontWeight: '500', color: '#374151' },
});
