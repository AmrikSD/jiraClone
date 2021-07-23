import 'reflect-metadata'
import os from 'os'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '@resolvers/UserResolver'
;(async () => {
  const port = process.env.PORT || 9000

  const app = express()
  const hostname = os.hostname() || 'unknown'

  console.log(`current node is ${hostname}`)

  app.get('/', (_req, res) => {
    res.send('hello world')
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.listen(port, () => {
    console.log(`listening on post ${port}`)
  })
})()
