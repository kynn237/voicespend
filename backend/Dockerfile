# Dockerfile — VoiceSpend Backend
# Multi-stage build pour optimiser la taille de l'image

# STAGE 1 : Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json en premier (optimise le cache Docker)
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# STAGE 2 : Production
FROM node:20-alpine

# Sécurité : utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package.json .

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposer le port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s \
    CMD wget -qO- http://localhost:3000/health || exit 1

# Lancer avec utilisateur non-root
USER appuser
CMD ["node", "src/app.js"]