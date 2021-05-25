const {ApolloServer} = require('apollo-server')
const {PrismaClient} = require('@prisma/client')
const {feed, link} = require('./resolvers/Query')
const {post, updatePost, deletePost} = require("./resolvers/Mutation")

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => 'this is the api of hackerNews!',
    feed,
    link
  },
  Mutation: {
    post,
    updatePost,
    deletePost,
  }
}

const fs = require('fs')
const path = require('path')
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), "utf-8"),
  resolvers,
  context: {
    prisma
  }
})

server.listen().then(({url}) => console.log(`server running on ${url}`))