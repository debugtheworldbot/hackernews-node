const feed = (parent, args, context) => {
  const {skip, take, orderBy} = args
  const where = args.filter ? {
    OR: [
      {description: {contains: args.filter}},
      {url: {contains: args.filter}},
    ]
  } : {}
  const links = context.prisma.link.findMany({
    where,
    skip,
    take,
    orderBy
  })
  const count = context.prisma.link.count({where})
  return {
    links,
    count
  }
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