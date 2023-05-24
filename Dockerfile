FROM node:latest
RUN apt-get update

COPY ./iANPR_Wrapper_linux.py /app/
COPY ./ /app/

EXPOSE 80

WORKDIR /app

RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]