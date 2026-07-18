'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { OrgInstanceBubble } from '@/components/org/org-instance-bubble';
import { useActiveOrgInstances } from '@/hooks/use-active-org-instances';
import { findClosestOrgInstance } from '@/lib/dates';
import type { OrgType } from '@/types/domain';

const VALID_TYPES: OrgType[] = ['CFG', 'COMITE'];

export default function OrgPage() {
  const params = useParams<{ type: string }>();
  const upperType = params.type?.toUpperCase() as OrgType | undefined;
  const isValidType = upperType && VALID_TYPES.includes(upperType);

  const { data: instances, isLoading } = useActiveOrgInstances(isValidType ? upperType : 'CFG');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const currentWeekInstance = useMemo(
    () => (instances ? findClosestOrgInstance(instances) : null),
    [instances]
  );

  useEffect(() => {
    if (currentWeekInstance && selectedId === null) {
      setSelectedId(currentWeekInstance.id);
    }
  }, [currentWeekInstance, selectedId]);

  if (!isValidType) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <p className="text-sm text-destructive">Type d&apos;ORG invalide.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 py-6">
      <h1 className="text-xl font-semibold">Organe {upperType === 'CFG' ? 'CFG' : 'Comité'}</h1>

      {isLoading && <p className="text-sm text-muted-foreground">Chargement des ORG...</p>}

      {!isLoading && instances?.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun ORG actif pour le moment.</p>
      )}

      {!isLoading && instances && instances.length > 0 && (
        <OrgInstanceBubble
          instances={instances}
          selectedId={selectedId}
          currentWeekId={currentWeekInstance?.id ?? null}
          onSelect={setSelectedId}
        />
      )}

      <div className="flex-1">
        <p className="text-sm text-muted-foreground">
          Tableau des tâches à venir à l&apos;étape suivante.
        </p>
      </div>
    </main>
  );
}
