const feed = (parent, args, context) => {
  const where = args.filter ? {
    OR: [
      {description: {contains: args.filter}},
      {url: {contains: args.filter}},
    ]
  } : {}
  return context.prisma.link.findMany({where})
}

const link = (parent, args, context) => context.prisma.link.findFirst({
  where: {
    id: parseInt(args.id)
  }
})

module.exports = {
  feed,
  link
}