'use client';

import { useState } from 'react';
import { ArchiveIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useArchiveOrgInstance } from '@/hooks/use-active-org-instances';
import { getErrorMessage } from '@/lib/api/error-message';
import { formatMeetingDate } from '@/lib/dates';
import type { OrgInstance, OrgType } from '@/types/domain';

interface ArchiveOrgDialogProps {
  type: OrgType;
  instance: OrgInstance;
}

export function ArchiveOrgDialog({ type, instance }: ArchiveOrgDialogProps) {
  const [open, setOpen] = useState(false);
  const archive = useArchiveOrgInstance(type);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) archive.reset(); // efface une éventuelle erreur à la fermeture
  }

  async function handleConfirm() {
    try {
      await archive.mutateAsync(instance.id);
      setOpen(false);
    } catch {
      // l'erreur est affichée via archive.error
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <ArchiveIcon />
          Archiver l&apos;ORG
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archiver cet ORG ?</DialogTitle>
          <DialogDescription>
            L&apos;ORG du {formatMeetingDate(instance.date_meeting)} disparaîtra de la liste active
            et ne sera plus consultable que dans les archives.
          </DialogDescription>
        </DialogHeader>

        {archive.isError && (
          <p className="text-sm text-destructive" role="alert">
            {getErrorMessage(archive.error)}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={archive.isPending}
          >
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={archive.isPending}>
            {archive.isPending ? 'Archivage...' : 'Archiver'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
