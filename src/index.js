const {ApolloServer} = require('apollo-server')

const typeDefs = `
  type Query{
    info:String!
    feed:[Link!]!
  }
  type Link{
    id:ID!
    description:String!
    url:String!
  }
`

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
const resolvers = {
  Query: {
    info: () => 'this is the api of hackerNews!',
    feed: () => links
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({url}) => console.log(`server running on ${url}`))