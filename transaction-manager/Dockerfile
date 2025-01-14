# Etapa 1: Construcción
FROM node:19-alpine AS builder
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código del proyecto
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:19-alpine AS runner
WORKDIR /app

# Configurar variables de entorno
ENV NODE_ENV production

# Copiar el build y archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Instalar dependencias de producción
RUN npm install --omit=dev

# Exponer el puerto para la aplicación Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
