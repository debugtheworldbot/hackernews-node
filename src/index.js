const {ApolloServer} = require('apollo-server')
const {PrismaClient} = require('@prisma/client')
const {feed, link} = require('./resolvers/Query')
const {post, updatePost, deletePost} = require("./resolvers/Mutation")

const prisma = new PrismaClient()
const {getUserId} = require('./utlis')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const resolvers = {
  Query,
  Mutation,
  User,
  Link
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
      userId: req && req.headers.authorization ? getUserId(req) : null
    }
  }
})

server.listen().then(({url}) => console.log(`server running on ${url}`))