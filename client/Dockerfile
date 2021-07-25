# Common build stage
FROM node:14.14.0-alpine3.12 as prebuild

# Install Dependencies
RUN mkdir /app/
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json


#### Development build stage ####
FROM prebuild as dev

EXPOSE 3000

ENV NODE_ENV development
RUN npm install --quiet
# Put in source AFTER the npm install, otherwise we lose caching of layers
COPY . /app/

CMD ["npm", "run", "start"]

#### Production build stage ####
FROM prebuild as prod-build

ENV NODE_ENV production
RUN npm install --quiet
# Put in source AFTER the npm install, otherwise we lose caching of layers
COPY . /app/ 

# remove any previously left over (for whatever reason) build folder
RUN rm -r build

RUN npm run build

### production deployment stage ### 
FROM nginx:stable-alpine as prod

COPY --from=prod-build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
