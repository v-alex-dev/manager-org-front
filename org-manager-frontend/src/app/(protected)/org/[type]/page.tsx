'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { OrgInstanceBubble } from '@/components/org/org-instance-bubble';
import { TaskList } from '@/components/org/task-list';
import { useActiveOrgInstances } from '@/hooks/use-active-org-instances';
import { findCurrentOrgInstance } from '@/lib/dates';
import type { OrgType } from '@/types/domain';

const ORG_LABELS: Record<OrgType, string> = { CFG: 'CFG', COMITE: 'Comité' };

function isOrgType(value: string | undefined): value is OrgType {
  return value === 'CFG' || value === 'COMITE';
}

export default function OrgPage() {
  const params = useParams<{ type: string }>();
  const upperType = params.type?.toUpperCase();

  if (!isOrgType(upperType)) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <p className="text-sm text-destructive">Type d&apos;ORG invalide.</p>
      </main>
    );
  }

  // key : changer de type (CFG vers Comité) remonte un composant neuf,
  // donc la sélection repart de zéro sans effet de bord.
  return <OrgScreen key={upperType} type={upperType} />;
}

function OrgScreen({ type }: { type: OrgType }) {
  const { data: instances, isLoading, isError } = useActiveOrgInstances(type);
  const [pickedId, setPickedId] = useState<number | null>(null);

  const currentInstance = useMemo(
    () => (instances ? findCurrentOrgInstance(instances) : null),
    [instances]
  );
  const selectedInstance =
    instances?.find((instance) => instance.id === pickedId) ?? currentInstance;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 py-6">
      <h1 className="text-xl font-semibold">Organe {ORG_LABELS[type]}</h1>

      {isLoading && <p className="text-sm text-muted-foreground">Chargement des ORG...</p>}

      {isError && (
        <p className="text-sm text-destructive" role="alert">
          Impossible de charger les ORG.
        </p>
      )}

      {instances && instances.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun ORG actif pour le moment.</p>
      )}

      {instances && instances.length > 0 && (
        <OrgInstanceBubble
          instances={instances}
          selectedId={selectedInstance?.id ?? null}
          currentWeekId={currentInstance?.id ?? null}
          onSelect={setPickedId}
        />
      )}

      <div className="flex-1">
        {selectedInstance && <TaskList orgInstanceId={selectedInstance.id} />}
      </div>
    </main>
  );
}
