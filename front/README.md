# Sportify — Frontend

Interface utilisateur de la plateforme Sportify : consultation et gestion de matchs, profil utilisateur, publications et favoris.

## Stack

| Technologie | Usage |
|-------------|-------|
| React 19 + TypeScript | UI |
| Vite 8 | Build et dev server |
| React Router 7 | Routing |
| TanStack React Query 5 | Cache et requêtes serveur |
| Zustand 5 | État global (auth, utilisateur) |
| Axios | Client HTTP |
| React Hook Form | Formulaires |
| Tailwind CSS 4 + DaisyUI | Styles |

## Prérequis

- Node.js 24+
- Backend Sportify lancé sur `http://localhost:3000`

## Installation

```bash
npm install
cp .env.example .env
```

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL de l'API backend | `http://localhost:3000` |

## Lancement

```bash
npm run dev       # http://localhost:5173
npm run build     # build production dans dist/
npm run preview   # prévisualiser le build
npm run lint      # ESLint
```

## Structure du projet

```
src/
├── pages/              # Pages (auth, matchs, profil, accueil…)
├── components/         # Composants UI réutilisables
│   ├── matchs/         # Formulaires création/édition match
│   ├── profile/        # En-tête, pied de page profil
│   ├── navigation/     # Barre de navigation
│   └── section/        # Sections de la page d'accueil
├── hooks/              # useAuth, useMatches, useProfile
├── services/api/       # auth.service, matches.service, profile.service, apiClient
├── stores/             # auth.store, user.store (Zustand + persist)
├── layouts/            # PublicLayout, AppLayout, PrivateLayout
├── guards/             # PrivateRoute (routes protégées)
├── types/              # Types TypeScript partagés
├── data/               # Données mock (clubs matchs)
└── common/utils/       # Utilitaires (dates)
```

### Alias Vite

| Alias | Chemin |
|-------|--------|
| `@` | `src/` |
| `@pages` | `src/pages/` |
| `@components` | `src/components/` |
| `@services` | `src/services/` |
| `@types` | `src/types/` |

## Routes

| Route | Page | Accès |
|-------|------|-------|
| `/signin` | Connexion | Public |
| `/signup` | Inscription | Public |
| `/` | Accueil | Privé |
| `/matchs` | Liste des matchs | Privé |
| `/matchs/nouveau` | Créer un match | Privé |
| `/matchs/:id/modifier` | Modifier un match | Privé |
| `/profile` | Profil | Privé |
| `/profile/settings` | Paramètres profil | Privé |
| `/publications` | Publications | Privé (placeholder) |
| `/favoris` | Favoris | Privé (placeholder) |

## Intégration API

Les services dans `src/services/api/` communiquent avec le backend NestJS.

| Service | Endpoints utilisés |
|---------|-------------------|
| `auth.service.ts` | `POST /auth/login`, `/auth/register`, `/auth/logout` |
| `profile.service.ts` | `GET /users/profile`, `PATCH /users/me`, `DELETE /users/me` |
| `matches.service.ts` | `GET/POST/PATCH /matches` |

Le client Axios (`apiClient.ts`) injecte automatiquement le token JWT depuis le store Zustand.

> **Note :** le refresh token côté backend est géré via cookie httpOnly (`POST /auth/refresh`). L'intercepteur front appelle encore `/auth/refresh_token` avec un token en localStorage — alignement en cours.

## État d'avancement

- **Connecté à l'API :** auth, profil, matchs (CRUD)
- **Données mock :** clubs dans les formulaires matchs (`src/data/mockMatchClubs.ts`)
- **Placeholder :** publications, favoris
- **Prévu :** routes manager (`PrivateRoute allowedRoles={["manager"]}`)

## Docker

```bash
docker build -t sportify-front .
```

L'image sert le build statique via Nginx sur le port **80**.

## Dépôt

```
https://git.alt-tools.tech/gp_devclassico/sportify/front.git
```
