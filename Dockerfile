FROM node:22.17.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY eslint.config.mjs ./
COPY apps/registration-app/ ./apps/registration-app/

RUN npm install

RUN npx nx build registration-app

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/apps/registration-app/browser/. /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 