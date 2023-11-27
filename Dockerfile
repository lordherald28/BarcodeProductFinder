FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY  .   /usr/src/app
#COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g @angular/cli
RUN npm install --silent

EXPOSE 4200
CMD ng serve --host 0.0.0.0

