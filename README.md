# Sportify — Backend

API REST de la plateforme Sportify. Gère l'authentification, les utilisateurs, les matchs, les clubs, les publications et les interactions (likes, notifications).

## Stack

| Technologie | Usage |
|-------------|-------|
| NestJS 11 | Framework API |
| Prisma 7 + adapter MariaDB | ORM et migrations |
| Passport + JWT | Authentification |
| bcrypt | Hash des mots de passe |
| class-validator | Validation des DTO |
| Jest + Supertest | Tests |

## Prérequis

- Node.js 24+
- MariaDB / MySQL (port **3310** en local)
- Base `sportify` créée

## Installation

```bash
npm install
cp .env.example .env   # adapter DATABASE_URL et secrets JWT
npx prisma generate
npx prisma migrate deploy
```

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | Connexion MariaDB/MySQL | `mysql://root:pass@localhost:3310/sportify` |
| `PORT` | Port de l'API | `3000` |
| `JWT_ACCESS_SECRET` | Secret access token | — |
| `JWT_REFRESH_SECRET` | Secret refresh token | — |
| `JWT_ALGO` | Algorithme JWT | `HS256` |
| `JWT_ACCESS_EXP` | Durée access token | `1d` |
| `JWT_REFRESH_EXP` | Durée refresh token | `7d` |
| `JWT_REFRESH_MAX_AGE` | Durée cookie refresh (jours) | `7` |
| `SALT` | Rounds bcrypt | `10` |

## Lancement

```bash
npm run start:dev    # développement avec watch
npm run start        # sans watch
npm run build        # compilation
npm run start:prod   # production (après build)
```

API sur **http://localhost:3000** — CORS autorisé pour `http://localhost:5173` avec `credentials: true`.

## Structure du projet

```
src/
├── auth/               # Register, login, refresh, logout (JWT + cookie)
├── users/              # Profil, mise à jour, suppression compte
├── matches/            # CRUD matchs + règles métier
├── clubs/              # CRUD clubs
├── articles/           # Publications
├── comments/           # Commentaires
├── notifications/      # Notifications
├── notifies/           # Liaison user ↔ notification
├── manages/            # Rôles Manager / CM par club
├── likearticle/        # Likes articles
├── likecomment/        # Likes commentaires
├── hash/               # Service bcrypt
├── tokens/             # Refresh tokens en BDD
└── common/             # Utilitaires partagés

prisma/
├── schema.prisma       # Modèles de données
├── migrations/         # Historique des migrations
├── generated/prisma/   # Client Prisma généré
└── prisma.service.ts   # Service injectable NestJS
```

## Modèles Prisma

| Modèle | Description |
|--------|-------------|
| `Users` | Comptes utilisateurs |
| `Clubs` | Clubs sportifs |
| `Matches` | Matchs (avec `userId` créateur) |
| `Articles` | Publications liées à un club |
| `Comments` | Commentaires sur articles |
| `Notifications` / `Notifies` | Système de notifications |
| `Manages` | Rôles manager / community manager |
| `LikeArticle`, `LikeComment`, `LikeClub` | Favoris |
| `Tokens` | Refresh tokens persistés |

## Routes API

Pas de préfixe `/api` — routes à la racine.

### Auth — `/auth`

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/auth/register` | Non | Inscription |
| POST | `/auth/login` | Non | Connexion (access token + cookie refresh) |
| POST | `/auth/refresh` | Cookie | Renouvellement du token |
| POST | `/auth/logout` | Non | Déconnexion |

### Users — `/users`

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/users/profile` | Oui | Profil de l'utilisateur connecté |
| PATCH | `/users/me` | Oui | Mise à jour du profil |
| DELETE | `/users/me` | Oui | Suppression du compte |
| GET | `/users/:id` | Oui | Détail utilisateur |

### Matches — `/matches`

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/matches` | Non | Liste des matchs |
| GET | `/matches/:id` | Non | Détail d'un match |
| POST | `/matches` | Oui | Création (créateur = JWT) |
| PATCH | `/matches/:id` | Oui | Modification (créateur uniquement) |
| DELETE | `/matches/:id` | Oui | Suppression (créateur uniquement) |

Autres modules : `/clubs`, `/articles`, `/comments`, `/notifications`, `/notifies`, `/manages`, `/likearticle`, `/likecomment`.

## Prisma

```bash
npx prisma generate          # régénérer le client
npx prisma migrate deploy    # appliquer les migrations (recommandé)
npx prisma migrate dev       # dev (peut demander un reset si historique modifié)
npx prisma studio            # interface graphique BDD
```

### Migrations

```
prisma/migrations/
├── 20260526114806_mig_sport_1/
├── 20260527112624_canard/
├── 20260528124945_merge_schema/
├── 20260528125121_nullable_match_scores/
├── 20260602113951_init/
└── 20260608140000_add_match_user_id/   # ajout userId sur matches
```

## Tests

```bash
npm run test         # tests unitaires
npm run test:e2e     # tests end-to-end
npm run test:cov     # couverture
npm run lint         # ESLint
```

## Docker

```bash
docker build -t sportify-back .
```

Image multi-stage Node 24, expose le port **3000**.

## Dépôt

```
https://git.alt-tools.tech/gp_devclassico/sportify/back.git
```
