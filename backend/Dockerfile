FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV CORS_ORIGIN=*
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
RUN npm install tsx
COPY docker/entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh
EXPOSE 3001
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
CMD ["npm", "run", "start"]