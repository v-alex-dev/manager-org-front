import { ApiError } from '@/lib/api/client';

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const first = error.errors ? Object.values(error.errors)[0]?.[0] : undefined;
    return first ?? error.message;
  }
  return 'Connexion impossible. Vérifiez votre réseau.';
}
