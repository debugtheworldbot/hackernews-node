const jwt = require("jsonwebtoken");
const {APP_SECRET, getUserId} = require('../utlis')
const bcrypt = require('bcryptjs')

const post = async (parent, args, context) => {
  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {connect: {id: context.userId}}
    }
  })
  await context.pubsub.publish('New_Link', newLink)
  return newLink
}
const updatePost = (parent, args, context) => context.prisma.link.update({
  where: {
    id: parseInt(args.id)
  },
  data: {
    url: args.url,
    description: args.description,
    postedBy: {connect: {id: context.userId}}
  }
})
const deletePost = (parent, args, context) => context.prisma.link.delete({
  where: {
    id: parseInt(args.id)
  }
})

const signUp = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({data: {...args, password}})
  const token = jwt.sign({userId: user.id}, APP_SECRET)
  return {
    user,
    token
  }
}

const logIn = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({where: {email: args.email}})
  if (!user) {
    throw new Error('No such user!')
  }
  const validate = await bcrypt.compare(args.password, user.password)
  if (!validate) {
    throw new Error('wrong password')
  }
  const token = jwt.sign({userId: user.id}, APP_SECRET)
  return {
    user,
    token
  }
}

const vote = async (parent, args, context, info) => {
  const userId = getUserId(context)
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: parseInt(args.linkId),
        userId
      }
    },
  })
  if (!!vote) {
    throw new Error('You have already voted this link!')
  }
  const newVote = context.prisma.vote.create({
    data: {
      user: {connect: {id: userId}},
      link: {connect: {id: parseInt(args.linkId)}}
    }
  })
  await context.pubsub.publish('NEW_VOTE', newVote)
  return newVote
}

module.exports = {
  post,
  updatePost,
  deletePost,
  signUp,
  logIn,
  vote
}