const {ApolloServer} = require('apollo-server')

const typeDefs = `
  type Query{
    info:String!
  }
`

const resolvers = {
  Query: {
    info: () => 'this is the api of hackerNews!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({url})=>console.log(`server running on ${url}`))