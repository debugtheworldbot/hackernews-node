const postedBy = (parent, args, context) => context.prisma.link.findUnique({where: {id: parent.id}}).postedBy()
const votes = (parent, args, context) => context.prisma.link.findUnique({where: {id: parent.id}}).votes()

module.exports = {
  postedBy,
  votes
}