const {ApolloServer} = require('apollo-server')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length
const resolvers = {
  Query: {
    info: () => 'this is the api of hackerNews!',
    feed: () => links
  },
  Mutation:{
    post:(parent,args)=>{
      const link = {
        id:`link-${idCount++}`,
        description:args.description,
        url:args.url
      }
      links.push(link)
      return link
    }
  },
}

const fs = require('fs')
const path = require('path')
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'),"utf-8"),
  resolvers,
})

server.listen().then(({url}) => console.log(`server running on ${url}`))