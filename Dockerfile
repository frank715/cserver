FROM node:lts-alpine
ENV NODE_ENV=production
RUN npm install -g nodemon
WORKDIR /usr/src
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src
USER node
CMD ["env","npm", "start"]
