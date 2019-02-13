const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')
const schemaPrinter = require('graphql/utilities/schemaPrinter')
const { typeDefs, resolvers } = require('./schema')

const app = express()

app.use(cors())
app.use(cookieParser())
app.options('*', cors())
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return next()
})

// app.use('/schema', (req, res) => {
//   res.set('Content-Type', 'text/plain')
//   res.send(schemaPrinter.printSchema(schema))
// })

const auth = async (req, res, next) => {
  // const uid
  const auth = req.headers.authorization
  if (/^Bearer /.test(auth)) {
    const token = auth.replace('Bearer ', '')
    const { uid } = await admin.auth().verifyIdToken(token)
    req.uid = uid
  }
  next()
}
app.use(auth)

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
