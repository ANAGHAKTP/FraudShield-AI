FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app
# Install a lightweight static server
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

# Expose Vite preview/production port
EXPOSE 5173

# Serve the static build on the requested port
CMD ["serve", "-s", "dist", "-l", "5173"]
