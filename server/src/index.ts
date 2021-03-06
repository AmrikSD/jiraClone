process.env['NODE_CONFIG_DIR'] = __dirname + '/config'
import { logger, stream } from '@utils/logger'

import 'reflect-metadata'
import os from 'os'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '@resolvers/UserResolver'
import { createConnection } from 'typeorm'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import isDocker from 'is-docker'
import config from 'config'
import { authRouter } from '@routes/authRouter'
(async () => {
  const port = process.env.PORT || 9000
  const hostname = os.hostname() || 'unknown'
  const env = process.env.NODE_ENV || 'unknown'

  const app = express()
  app.use(cors({
    origin:["http://localhost:3000","https://studio.apollographql.com"],
    credentials:true
  }))
  app.use(morgan(config.get('log.format'), { stream }))
  app.use(cookieParser())
  await createConnection() //all info used in this is from ./ormconfig.json

  app.get('/', (_req, res) => {
    res.send('hello world')
  })
  app.use('/auth', authRouter)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors:false })

  app.listen(port, () => {
    logger.info(`=================================`)
    logger.info(`======= ENV: ${env} ========`)
    logger.info(`${isDocker() ? '🐳' : '🖥️'} Running on node ${hostname}`)
    logger.info(`🚀 App listening on the port ${port}`)
    logger.info(`=================================`)
  })
})()
