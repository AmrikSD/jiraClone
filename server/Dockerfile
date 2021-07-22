# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

# Install Dependencies
RUN mkdir /app/
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app

EXPOSE 9000

#### Development build stage ####
FROM common-build-stage as development-build-stage

ENV NODE_ENV development
RUN npm install
# Put in source AFTER the npm install, otherwise we lose caching of layers
COPY . /app/

CMD ["npm", "run", "dev"]

#### Production build stage ####
FROM common-build-stage as production-build-stage

ENV NODE_ENV production
RUN npm install
# Put in source AFTER the npm install, otherwise we lose caching of layers
COPY . /app/

CMD ["npm", "run", "start"]

