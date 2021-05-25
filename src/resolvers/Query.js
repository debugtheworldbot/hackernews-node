const feed = (parent, args, context) => context.prisma.link.findMany()

const link = (parent, args, context) => context.prisma.link.findFirst({
  where: {
    id: parseInt(args.id)
  }
})

module.exports = {
  feed,
  link
}