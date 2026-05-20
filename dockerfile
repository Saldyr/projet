# ===== STAGE 1 : BUILD =====
# Premier stage utilisé pour construire le projet NestJS
# "AS build" donne un nom au stage pour le réutiliser plus tard
FROM  node:22.22.2-alpine3.22 AS build

# Définit le dossier de travail dans le conteneur
# Toutes les commandes suivantes seront exécutées dans /app
WORKDIR /app

# Copie package.json dans le conteneur
# Contient les dépendances et scripts du projet
COPY package.json ./

# Copie package-lock.json
# Permet d'installer exactement les mêmes versions des dépendances
COPY package-lock.json ./

# Installe les dépendances du projet
# "npm ci" est plus rapide et plus stable pour Docker
RUN npm ci

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Compile le projet NestJS
# Génère le dossier dist contenant le code JavaScript final
RUN npm run build



# ===== STAGE 2 : RUNTIME =====
# Deuxième stage utilisé pour exécuter l'application
# On repart d'une image propre et légère
FROM  node:22.22.2-alpine3.22

# Dossier de travail du conteneur final
WORKDIR /app

# Copie package.json dans le conteneur final
COPY package.json ./

# Copie package-lock.json dans le conteneur final
COPY package-lock.json ./

# Réinstalle les dépendances nécessaires pour exécuter l'application
RUN npm ci

# Copie uniquement le résultat du build depuis le stage "build"
# Permet d'éviter de copier les fichiers inutiles du projet
COPY --from=build /app/dist ./dist

# Informe Docker que l'application écoute sur le port 3000
EXPOSE 3000

# Commande exécutée au démarrage du conteneur
# Lance l'application NestJS compilée
CMD ["node", "dist/src/main.js"]