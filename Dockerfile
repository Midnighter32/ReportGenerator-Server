FROM node:latest

WORKDIR /app

COPY . /app

RUN apt-get update

RUN /bin/sh libreoffice_install.sh

EXPOSE 80

RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]