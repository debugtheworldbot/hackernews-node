const {ApolloServer} = require('apollo-server')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => 'this is the api of hackerNews!',
    feed: (parent, args, context) => context.prisma.link.findMany(),
    link: (parent, args, context) => context.prisma.link.findFirst({
      where: {
        id: parseInt(args.id)
      }
    })
  },
  Mutation: {
    post: (parent, args, context) => context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description
      }
    }),
    update: (parent, args, context) => context.prisma.link.update({
      where: {
        id: parseInt(args.id)
      },
      data:{
        url: args.url,
        description: args.description
      }
    }),
    delete: (parent, args, context) => context.prisma.link.delete({
      where: {
        id: parseInt(args.id)
      }
    })
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