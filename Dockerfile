
FROM node:20-bookworm AS builder


WORKDIR /app-root/


COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-bookworm

WORKDIR /home/node

COPY --from=builder /app-root/staging build

CMD ["npx", "serve", "-s", "build"]