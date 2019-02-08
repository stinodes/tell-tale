const graphqlTools = require('graphql-tools')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { prop, map, call, compose } = require('ramda')

const schema = `
  type Query {
    tales: [Tale]
    users: [User]
  }

  type Tale {
    id: String!
    title: String!
    description: String
    paragraphs: [Paragraph]
    author: User!
  }

  type Paragraph {
    id: String!
    body: String!
    index: Int!
  }

  type User {
    authUid: String!
    pseudonym: String
    firstName: String
    lastName: String
  }
`

admin.initializeApp(functions.config().firebase)

const data = doc => ({ ...doc.data(), id: doc.id })
const talesReference = admin.firestore().collection('tales')
const usersReference = admin.firestore().collection('users')

const resolvers = {
  Query: {
    async tales() {
      const talesSnapshot = await talesReference.orderBy('title', 'desc').get()
      return map(data, talesSnapshot.docs)
    },
  },
  Tale: {
    async author(tale) {
      const userSnapshot = await usersReference.doc(tale.author).get()
      return data(userSnapshot)
    },
    async paragraphs(tale) {
      const paragraphsSnapshot = await talesReference
        .doc(tale.id)
        .collection('paragraphs')
        .orderBy('index', 'asc')
        .get()
      return map(data, paragraphsSnapshot.docs)
    },
  },
}

module.exports = {
  typeDefs: schema,
  resolvers,
}
