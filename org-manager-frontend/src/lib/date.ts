export function formatMeetingDate(dateIso: string): string {
  const date = new Date(dateIso);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

export function findClosestOrgInstance<T extends { date_meeting: string }>(
  instances: T[],
  referenceDate: Date = new Date()
): T | null;
export function sortByMeetingDateAsc<T extends { date_meeting: string }>(instances: T[]): T[] {}
