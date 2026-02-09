FROM node:25-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

CMD ["pnpm", "test"]