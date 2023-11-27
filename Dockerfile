FROM node:19.8.1
#ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . /usr/src/app
EXPOSE 4200
#RUN chown -R node /usr/src/app
#USER node
CMD ["npm", "start"]
