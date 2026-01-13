FROM node:25-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

FROM alpine AS development

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build auth

FROM alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /app/dist ./dist

CMD ["node", "dist/apps/auth/main"]