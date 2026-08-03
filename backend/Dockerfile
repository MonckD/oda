# DEBUT DE CONTENEURISATION
# ==============================================
# Image de l'API backend (Node.js + Express).
# On copie UNIQUEMENT le nécessaire : package.json
# + dossier backend. Le .env N'EST PAS copié :
# les variables viennent du docker-compose.yml.
# ==============================================

# l'image de base est Node.js 22 sur Alpine Linux (léger)
FROM node:22-alpine

WORKDIR /app

# 1) Copier et installer les dépendances de production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 2) Copier le code du backend
COPY backend ./backend

EXPOSE 3000

# 3) Démarrage du serveur
CMD ["node", "backend/server.js"]

# FIN DE CONTENEURISATION
