'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { formatMeetingDate, sortByMeetingDateAsc } from '@/lib/dates';
import type { OrgInstance } from '@/types/domain';

interface OrgInstanceBubbleProps {
  instances: OrgInstance[];
  selectedId: number | null;
  currentWeekId: number | null;
  onSelect: (id: number) => void;
}
