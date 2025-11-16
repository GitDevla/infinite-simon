FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_SERVER_URL=http://localhost:3001
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
RUN npm run build
 
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]