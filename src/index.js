const {ApolloServer} = require('apollo-server')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => 'this is the api of hackerNews!',
    feed: (parent, args, context) => context.prisma.link.findMany(),
    link: (parent, args, context) => context.prisma.link.findFirst({
      where: {
        id: args.id
      }
    })
  },
  Mutation: {
    post: (parent, args, context) => context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description
      }
    })
    ,
    // update: (parent, args) => {
    //   links = links.map(l => l.id === args.id ? args : l)
    //   return args
    // },
    // delete: (parent, args) => {
    //   links = links.filter(l => l.id !== args.id)
    //   return args
    // },
  },
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