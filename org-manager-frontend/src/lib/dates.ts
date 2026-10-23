// Les dates de l'API arrivent sous la forme "2026-07-21T00:00:00.000000Z".
// On ne garde que la partie "YYYY-MM-DD" pour construire une date locale :
// ainsi, le jour affiché ne dépend jamais du fuseau horaire de l'appareil.
export function parseMeetingDate(value: string): Date {
  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

function startOfIsoWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // lundi
  return d;
}

export function sortByMeetingDateAsc<T extends { date_meeting: string }>(instances: T[]): T[] {
  return [...instances].sort(
    (a, b) =>
      parseMeetingDate(a.date_meeting).getTime() - parseMeetingDate(b.date_meeting).getTime()
  );
}

const meetingDateFormatter = new Intl.DateTimeFormat('fr-BE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatMeetingDate(value: string): string {
  return meetingDateFormatter.format(parseMeetingDate(value));
}

// ORG de la semaine en cours (lundi à dimanche), sinon le prochain à venir,
// sinon le dernier passé.
export function findCurrentOrgInstance<T extends { date_meeting: string }>(
  instances: T[],
  ref: Date = new Date()
): T | null {
  if (instances.length === 0) return null;

  const weekStart = startOfIsoWeek(ref).getTime();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const sorted = sortByMeetingDateAsc(instances);
  const time = (i: T) => parseMeetingDate(i.date_meeting).getTime();

  return (
    sorted.find((i) => time(i) >= weekStart && time(i) < weekEnd.getTime()) ??
    sorted.find((i) => time(i) >= weekStart) ??
    sorted[sorted.length - 1]
  );
}
