FROM registry.ftven.net/phoenix/common/pm2:latest as build-stage

#WORKDIR /srv/app
WORKDIR /srv/back-studio

# Bundle APP files
COPY package.json package-lock.json ./

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

# Build application
COPY . .
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
