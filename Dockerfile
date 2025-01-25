# BUILD FOR LOCAL DEVELOPMENT
FROM node:18-alpine AS development

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install

COPY --chown=node:node . .

USER node

# BUILD FOR PRODUCTION
FROM node:18-alpine AS build

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /home/node/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV PORT 3000
EXPOSE $PORT

USER node

# BUILD FOR STARTER SERVER
FROM node:18-alpine AS production

COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/dist ./dist

CMD [ "node", "dist/main.js" ]