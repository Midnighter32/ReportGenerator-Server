FROM node:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y cron

COPY libreoffice_install.sh /app

RUN /bin/sh libreoffice_install.sh

RUN rm -rf /etc/localtime && \
    ln -s /usr/share/zoneinfo/Etc/GMT-3 /etc/localtime

COPY ./fonts /usr/local/share/fonts

COPY . /app

RUN chmod 0644 /app/reboot.cronjob && \
    crontab /app/reboot.cronjob

RUN npm install

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]