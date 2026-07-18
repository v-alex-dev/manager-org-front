export function formatMeetingDate(dateIso: string): string {}
export function findClosestOrgInstance<T extends { date_meeting: string }>(
  instances: T[],
  referenceDate: Date = new Date()
): T | null;
export function sortByMeetingDateAsc<T extends { date_meeting: string }>(instances: T[]): T[] {}
