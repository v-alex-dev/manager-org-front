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
): T | null {
  if (instances.length === 0) return null;

  return instances.reduce((closest, current) => {
    const closestDiff = Math.abs(
      new Date(closest.date_meeting).getTime() - referenceDate.getTime()
    );
    const currentDiff = Math.abs(
      new Date(current.date_meeting).getTime() - referenceDate.getTime()
    );
    return currentDiff < closestDiff ? current : closest;
  });
}

export function sortByMeetingDateAsc<T extends { date_meeting: string }>(instances: T[]): T[] {
  return [...instances].sort(
    (a, b) => new Date(a.date_meeting).getTime() - new Date(b.date_meeting).getTime()
  );
}
