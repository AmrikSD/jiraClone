#=== prebuild image ===#
FROM node:14.14.0-alpine3.12 as prebuild-stage

# Install Dependencies
RUN mkdir /app/
WORKDIR /app/

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

#=== Dev Image ===#
FROM prebuild-stage as dev

EXPOSE 9000

ENV NODE_ENV=development
RUN npm install --quiet

COPY . .
CMD ["npm", "run", "dev"]

#=== Prod Image ===#
FROM prebuild-stage as prod

ENV NODE_ENV=production
RUN npm install --quiet

COPY . .
CMD ["npm","run","start"]