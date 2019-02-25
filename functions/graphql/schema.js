const graphqlTools = require('graphql-tools')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { AuthenticationError, NotFoundError } = require('apollo-server-express')
const { prop, map, call, compose } = require('ramda')

const schema = `
  type Query {
    tales: [Tale]
    talesForUser(userId: String): [Tale]
    talesForTags(tags: [String]): [Tale]
    users: [User]
    me: User
  }

  type Mutation {
    addUser(user: AddRegisterUserInput!): User
    editUser(user: EditUserInput): User
  }
  
  input AddRegisterUserInput {
    pseudonym: String
    firstName: String
    lastName: String
  }
  input EditUserInput {
    pseudonym: String
    firstName: String
    lastName: String
    bio: String
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
    bio: String
    tales: [Tale]
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
    async tales(_, __, { req }) {
      const talesSnapshot = await talesReference.get()
      return map(data, talesSnapshot.docs)
    },
    async users() {
      const usersSnapshot = await usersReference.get()
      return map(data, usersSnapshot.docs)
    },
    async me(_, __, { req }) {
      if (!req.uid) throw new AuthenticationError('You are not logged in.')

      const userSnapshot = await usersReference.doc(req.uid).get()

      const user = data(userSnapshot)

      return user
    },
  },
  Mutation: {
    async addUser(
      _,
      {
        user: { pseudonym = '', firstName = '', lastName = '' },
      },
      { req },
    ) {
      if (!req.uid) throw new AuthenticationError('You are not logged in.')
      const doc = await usersReference.doc(req.uid).set({
        authUid: req.uid,
        pseudonym,
        firstName,
        lastName,
      })
      return data(await doc.get())
    },
    async editUser(_, { user }, { req }) {
      console.log(user)
      const userDocument = await usersReference.doc(req.uid)
      try {
        await userDocument.update(user)
        return data(await userDocument.get())
      } catch (e) {
        throw new NotFoundError('User does not exist')
      }
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
  User: {
    async tales(user) {
      const talesSnapshot = await talesReference
        .where('author', '==', user.id)
        .get()
      return map(data, talesSnapshot.docs)
    },
  },
}

module.exports = {
  typeDefs: schema,
  resolvers,
}
