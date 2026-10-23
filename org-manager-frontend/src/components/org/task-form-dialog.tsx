'use client';

import { useState, type FormEvent } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateTask } from '@/hooks/use-tasks';
import { useCreateService, useServices } from '@/hooks/use-services';
import { ApiError } from '@/lib/api/client';

const NEW_SERVICE = 'new';

function firstErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const first = error.errors ? Object.values(error.errors)[0]?.[0] : undefined;
    return first ?? error.message;
  }
  return 'Connexion impossible. Verifiez votre reseau.';
}

interface TaskFormDialogProps {
  orgInstanceId: number;
}

export function TaskFormDialog({ orgInstanceId }: TaskFormDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusIcon />
          Ajouter une tâche
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle tâche</DialogTitle>
          <DialogDescription>
            La référence est générée à la validation et ne pourra plus être modifiée.
          </DialogDescription>
        </DialogHeader>
        <TaskForm orgInstanceId={orgInstanceId} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function TaskForm({ orgInstanceId, onDone }: TaskFormProps) {
  const { data: services, isLoading: servicesLoading } = useServices();
  const createService = useCreateService();
  const createTask = useCreateTask(orgInstanceId);

  const [pojTitle, setPojTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serviceValue, setServiceValue] = useState<string>('');
  const [newServiceName, setNewServiceName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isNewService = serviceValue === NEW_SERVICE;
  const isSubmitting = createService.isPending || createTask.isPending;
  const canSubmit =
    pojTitle.trim() !== '' &&
    serviceValue !== '' &&
    (!isNewService || newServiceName.trim() !== '') &&
    !isSubmitting;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      let serviceId: number;
      if (isNewService) {
        const created = await createService.mutateAsync({ name: newServiceName.trim() });
        serviceId = created.data.id;
      } else {
        serviceId = Number(serviceValue);
      }

      await createTask.mutateAsync({
        org_instance_id: orgInstanceId,
        service_id: serviceId,
        poj_title: pojTitle.trim(),
        poj_description: description.trim() || undefined,
      });
      onDone();
    } catch (err) {
      setError(firstErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="poj-title">Point à l&apos;ordre du jour</Label>
        <Input
          id="poj-title"
          required
          maxLength={255}
          value={pojTitle}
          onChange={(e) => setPojTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="poj-description">Description (optionnelle)</Label>
        <textarea
          id="poj-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 md:text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service</Label>
        <Select value={serviceValue} onValueChange={setServiceValue} disabled={servicesLoading}>
          <SelectTrigger id="service">
            <SelectValue placeholder={servicesLoading ? 'Chargement...' : 'Choisir un service'} />
          </SelectTrigger>
          <SelectContent>
            {services?.map((service) => (
              <SelectItem key={service.id} value={String(service.id)}>
                {service.name}
              </SelectItem>
            ))}
            <SelectItem value={NEW_SERVICE}>Créer un nouveau service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isNewService && (
        <div className="space-y-2">
          <Label htmlFor="new-service">Nom du nouveau service</Label>
          <Input
            id="new-service"
            required
            maxLength={255}
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={!canSubmit}>
        {isSubmitting ? 'Création...' : 'Créer la tâche'}
      </Button>
    </form>
  );
}

interface TaskFormProps {
  orgInstanceId: number;
  onDone: () => void;
}
