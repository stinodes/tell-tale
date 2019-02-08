const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')
const schemaPrinter = require('graphql/utilities/schemaPrinter')
const { typeDefs, resolvers } = require('./schema')

const app = express()

app.use(cors())
app.options('*', cors())
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return next()
})

// app.use('/schema', (req, res) => {
//   res.set('Content-Type', 'text/plain')
//   res.send(schemaPrinter.printSchema(schema))
// })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
  }),
  playground: true,
  introspection: true,
})

server.applyMiddleware({ app })

module.exports = app
