#=== prebuild image ===#
FROM node:14.14.0-alpine3.12 as prebuild

# Install Dependencies
RUN mkdir /app/
WORKDIR /app/

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

#=== Dev Image ===#
FROM prebuild as dev

EXPOSE 9000

ENV NODE_ENV=development
RUN npm ci --quiet

COPY . /app/

CMD ["npm", "run", "dev"]


#=== Prod Image ===#
FROM prebuild as prod

EXPOSE 9000

RUN NODE_ENV=development
RUN npm ci --quiet

COPY . /app/

RUN rm -rf build
RUN npm run build
RUN cp -r /app/src/config /app/build/

RUN npm prune --production

EXPOSE 9000
WORKDIR /app/build/

CMD ["node", "."]