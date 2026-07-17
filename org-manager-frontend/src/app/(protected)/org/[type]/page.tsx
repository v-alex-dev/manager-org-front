import { notFound } from "next/navigation";

const VALID_TYPES = ["CFG", "COMITE"] as const;

export default async function OrgPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const upperType = type.toUpperCase();

  if (!VALID_TYPES.includes(upperType as (typeof VALID_TYPES)[number])) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-xl font-semibold">Organe {upperType}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Bulle de selection et tableau des taches a venir a l&apos;etape
        suivante.
      </p>
    </main>
  );
}
