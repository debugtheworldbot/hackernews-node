const post = (parent, args, context) => context.prisma.link.create({
  data: {
    url: args.url,
    description: args.description
  }
})
const updatePost = (parent, args, context) => context.prisma.link.update({
  where: {
    id: parseInt(args.id)
  },
  data: {
    url: args.url,
    description: args.description
  }
})
const deletePost = (parent, args, context) => context.prisma.link.delete({
  where: {
    id: parseInt(args.id)
  }
})

module.exports = {
  post,
  updatePost,
  deletePost
}