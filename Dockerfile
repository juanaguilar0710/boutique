# Stage 1, "build-stage"
FROM node:18-slim as builder

RUN mkdir /build-folder
COPY package.json /build-folder
COPY package-lock.json /build-folder

WORKDIR /build-folder

## Deshabilitar SSL si es necesario
RUN npm config set strict-ssl false

## Eliminar módulos existentes y limpiar caché
RUN rm -rf node_modules package-lock.json && npm cache clean --force

## Instalar dependencias en modo CI
RUN npm install --legacy-peer-deps && mkdir /ng-app && mv node_modules /ng-app

## Instalar webpack como dependencia
RUN npm install webpack webpack-cli --legacy-peer-deps --save-dev

WORKDIR /ng-app

COPY . .

## Construir la aplicación Angular en modo producción
RUN npm run build || (cat /ng-app/angular-errors.log && exit 1)

# Stage 2, "Setup nginx"
FROM nginx:1.21.4-alpine
RUN apk update && apk fix -u freetype

## Copiar configuración de nginx
COPY nginx/default.conf /etc/nginx/conf.d/

## Eliminar el sitio web predeterminado de nginx
RUN rm -rf /usr/share/nginx/html/*

## Copiar artefactos generados en la carpeta dist al servidor web nginx
COPY --from=builder /ng-app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]