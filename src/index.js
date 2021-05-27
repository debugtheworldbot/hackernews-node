const {ApolloServer, PubSub} = require('apollo-server')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const pubsub = new PubSub()
const {getUserId} = require('./utlis')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')
const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote
}

const fs = require('fs')
const path = require('path')
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), "utf-8"),
  resolvers,
  context: ({req}) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null
    }
  }
})

server.listen().then(({url}) => console.log(`server running on ${url}`))