function startOfIsoWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // lundi
  return d;
}

export function findCurrentOrgInstance<T extends { date_meeting: string }>(
  instances: T[],
  ref: Date = new Date()
): T | null {
  if (instances.length === 0) return null;
  const start = startOfIsoWeek(ref);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  const sorted = sortByMeetingDateAsc(instances);
  const time = (i: T) => new Date(i.date_meeting).getTime();

  return (
    sorted.find((i) => time(i) >= start.getTime() && time(i) < end.getTime()) ??
    sorted.find((i) => time(i) >= start.getTime()) ??
    sorted[sorted.length - 1]
  );
}
