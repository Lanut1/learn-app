FROM node:18-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

WORKDIR /usr/src/app/prod
COPY package*.json ./

RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/prod/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
