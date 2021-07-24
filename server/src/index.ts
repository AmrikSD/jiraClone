import 'reflect-metadata'
import os from 'os'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '@resolvers/UserResolver'
import { createConnection } from 'typeorm'
;(async () => {
  const port = process.env.PORT || 9000
  const hostname = os.hostname() || 'unknown'

  const app = express()

  await createConnection() //all info used in this is from ./ormconfig.json

  console.log(`current node is ${hostname}`)

  app.get('/', (_req, res) => {
    res.send('hello world')
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.listen(port, () => {
    console.log(`listening on post ${port}`)
  })
})()
