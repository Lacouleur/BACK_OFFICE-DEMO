FROM registry.ftven.net/phoenix/common/pm2:latest as build-stage

# Install app dependencies
ARG PHX_BACK_API_BASE_URL
ARG PHX_BACK_HOST_URL
ENV NPM_CONFIG_LOGLEVEL warn
ENV BASE_URL=${BASE_URL:-$PHX_BACK_API_BASE_URL}
ENV HOST_URL=${HOST_URL:-$PHX_BACK_HOST_URL}

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
