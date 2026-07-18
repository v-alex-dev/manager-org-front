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

export function OrgInstanceBubble({
  instances,
  selectedId,
  currentWeekId,
  onSelect,
}: OrgInstanceBubbleProps) {
  return (
    <Select
      value={selectedId ? String(selectedId) : undefined}
      onValueChange={(value) => onSelect(Number(value))}
    >
      <SelectTrigger className="h-auto w-full rounded-full border-none bg-secondary px-4 py-2 shadow-sm">
        <SelectValue placeholder="Choisir un ORG" />
      </SelectTrigger>
      <SelectContent>
        {sorted.map((instance) => (
          <SelectItem key={instance.id} value={String(instance.id)}>
            <span className="flex items-center gap-2">
              {formatMeetingDate(instance.date_meeting)}
              {instance.id === currentWeekId && (
                <Badge variant="secondary" className="text-[10px]">
                  Cette semaine
                </Badge>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
