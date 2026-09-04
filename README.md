# Sportify

Application web qui réunit sur une même plateforme des clubs sportifs, leurs événements et leurs adhérents.

Projet réalisé en équipe de 3 pendant ma formation de Concepteur Développeur d'Applications, dans des conditions proches du travail en entreprise : revues de code, méthode agile, retours réguliers de développeurs plus expérimentés.

## Fonctionnalités

- Création de compte et connexion, authentification par JWT
- Gestion des clubs et de leurs membres
- Création et suivi d'événements sportifs

## Stack technique

**Frontend** (`/front`)
- React, TypeScript
- Zustand pour l'état global
- TanStack Query pour les appels API

**Backend** (`/back`)
- NestJS, Node.js
- Prisma ORM, base de données MySQL
- API REST, authentification JWT avec Guards et Interceptors, validation des entrées par DTO

**Infrastructure**
- Docker et Docker Compose
- Git, GitHub, GitLab

## Lancer le projet en local

```bash
# Backend
cd back
cp .env.example .env      # renseigner la connexion MySQL
npm install
npx prisma migrate dev
npm run start:dev

# Frontend
cd front
npm install
npm run dev
```

## Mon rôle dans le projet

Au sein d'une équipe de 3 personnes, nous avons travaillés ensemble aussi bien sur la conception (Users Stories, MCD, MLD, MPD).
Nous avons travaillés en méthode Agile, avec un système de ticketing (Youtrack). J'ai aussi bien géré la partie Front-end avec React, Zunstand, Tanstack et
la partie Back-end avec NestJs , Prisma ORM et API Rest. J'ai participer au câblage avec Postman et des tests en utilisant Cypress.

