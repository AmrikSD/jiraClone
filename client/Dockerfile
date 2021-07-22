# Common build stage
FROM node:14.14.0-alpine3.12 as common-prebuild-stage

# Install Dependencies
RUN mkdir /app/
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app

EXPOSE 3000

#### Development build stage ####
FROM common-prebuild-stage as development-build-stage

ENV NODE_ENV development
RUN npm install
# Put in source AFTER the npm install, otherwise we lose caching of layers
COPY . /app/

CMD ["npm", "run", "start"]

#### Production build stage ####
FROM common-prebuild-stage as production-build-stage

ENV NODE_ENV production
RUN npm install
# Put in source AFTER the npm install, otherwise we lose caching of layers
COPY . /app/ 


RUN rm -r build
RUN npm run build

### production deployment stage ### 
FROM nginx:stable-alpine as production-deployment

COPY --from=production-build-stage /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
