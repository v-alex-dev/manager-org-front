# ORG-Manager — Frontend

PWA Next.js pour la gestion des reunions CFG et Comite. Consomme l'API decrite dans `Doc_API.md`.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack en dev)
- Tailwind CSS v4 + shadcn/ui (composants sources dans `src/components/ui`)
- TanStack Query pour la gestion des donnees serveur
- Serwist pour le service worker (PWA installable, precache de l'app shell)

## Demarrage

```bash
npm install
cp .env.example .env.local   # renseigner NEXT_PUBLIC_API_URL
npm run dev
```

`NEXT_PUBLIC_API_URL` doit pointer vers l'API Laravel (ex: `http://localhost:8000`).

## Build de production

```bash
npm run build
npm run start
```

Le build utilise `--webpack` explicitement : Serwist n'a pas encore de support stable pour Turbopack (voir avertissement affiche en dev, sans impact car le service worker est desactive en developpement).

## Deploiement

Le projet est un projet Next.js standard, deployable sur Vercel sans configuration additionnelle. Penser a renseigner `NEXT_PUBLIC_API_URL` dans les variables d'environnement Vercel (Production et Preview).

## Etat d'avancement (roadmap Frontend du dossier fonctionnel)

- [x] Etape 1 — Setup & Authentification (login, stockage du token Sanctum, layout protege avec redirection)
- [x] Etape 2 — Ecran d'accueil avec les 3 boutons principaux (CFG, Comite, Archives)
- [ ] Etape 3 — Ecran Organe : bulle de selection, tableau des taches, code couleur de statut, report de tache, formulaire de creation, bouton Archiver
- [ ] Etape 4 — Ecran Archives : filtres cumulables, liste paginee par curseur

## Points d'attention

- Les icones PWA (`/public/icon-192x192.png`, `/public/icon-512x512.png`) sont referencees dans `src/app/manifest.ts` mais pas encore fournies : a remplacer par les visuels de marque avant mise en production.
- L'authentification utilise le mode token de Sanctum (`Authorization: Bearer`), pas le mode cookie SPA. Le token est stocke via `src/lib/auth/token-storage.ts`, un point d'entree unique si la strategie de stockage doit evoluer.
- Chaque ressource de l'API a son propre module dans `src/lib/api/` (`auth.ts`, `services.ts`, `orgs.ts`, `tasks.ts`, `archives.ts`), avec les payloads et types definis dans `src/types/domain.ts`.
