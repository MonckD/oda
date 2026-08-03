# DEBUT DE CONTENEURISATION
# ==============================================
# Image du frontend en 2 étapes :
#   étape 1 (build) : Node compile le site (npm run build)
#   étape 2 (serve) : nginx sert les fichiers + proxy /api
# ==============================================

# --- Étape 1 : construction du site statique ---
FROM node:22-alpine AS build

WORKDIR /app

# 1) Dépendances du frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# 2) Code source + build
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm run build

# --- Étape 2 : serveur web (nginx) ---
FROM nginx:alpine

# Config nginx : serve le site + redirige /api vers le backend
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Fichiers statiques compilés à l'étape 1
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

# FIN DE CONTENEURISATION
