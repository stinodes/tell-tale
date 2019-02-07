const graphqlTools = require('graphql-tools')
const admin = require('firebase-admin')

const schema = `
  type Query = {
    tales: [Tale]
    users: [User]
  }

  type Tale = {
    id: string!
    title: string!
    description: string
    paragraphs: [Paragraph]
    owner: User!
  }

  type Paragraph = {
    id: string!
    body: string!
    index: number!
  }

  type User = {
    id: string!
    pseudonym: string
    firstName: string
    lastName: string
    email: string!
  }
`

const resolvers = {
  Query: {
    async tales() {},
  },
}
