const graphqlTools = require('graphql-tools')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { prop, map, call, compose } = require('ramda')

const schema = `
  type Query {
    tales: [Tale]
    users: [User]
    me: User
  }

  type Mutation {
    addUser(authUid: String!, pseudonym: String, firstName: String, lastName: String): User
  }

  type Tale {
    id: String!
    title: String!
    description: String
    paragraphs: [Paragraph]
    tags: [Tag]
    author: User!
  }

  type Paragraph {
    id: String!
    body: String!
    index: Int!
  }

  type User {
    id: String!
    pseudonym: String
    firstName: String
    lastName: String
  }

  type Tag {
    label: String!
    name: String!
  }
`

admin.initializeApp(functions.config().firebase)

const data = doc => ({ ...doc.data(), id: doc.id })
const talesReference = admin.firestore().collection('tales')
const usersReference = admin.firestore().collection('users')

const resolvers = {
  Query: {
    async tales() {
      const talesSnapshot = await talesReference.get()
      return map(data, talesSnapshot.docs)
    },
    async users() {
      const usersSnapshot = await usersReference.get()
      return map(data, usersSnapshot.docs)
    },
  },
  Mutation: {
    async addUser(_, { pseudonym, firstName, lastName }, { req }) {
      if (!req.uid) throw new Error('You are not logged in.')
      const doc = await usersReference.add({
        authUid: req.uid,
        pseudonym,
        firstName,
        lastName,
      })
      return data(await doc.get())
      // return { id: 'test', authUid: 'test' }
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
