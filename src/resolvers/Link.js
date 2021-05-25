const postedBy = (parent, args, context) => context.prisma.link.findUnique({where: {id: parent.id}}).postedBy()

module.exports = {
  postedBy
}