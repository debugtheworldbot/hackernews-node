const jwt = require("jsonwebtoken");
const {APP_SECRET, getUserId} = require('../utlis')
const bcrypt = require('bcryptjs')

const post = (parent, args, context) => context.prisma.link.create({
  data: {
    url: args.url,
    description: args.description,
    postedBy: {connect: {id: context.userId}}
  }
})
const updatePost = (parent, args, context) => context.prisma.link.update({
  where: {
    id: parseInt(args.id)
  },
  data: {
    url: args.url,
    description: args.description
    // todo
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
  const user = context.prisma.user.findUnique({where: {email: args.email}})
  if (!user) {
    throw new Error('No such user!')
  }
  const validate = await bcrypt.compare(user.password, args.password)
  if (!validate) {
    throw new Error('wrong password')
  }
  const token = jwt.sign({userId: user.id}, APP_SECRET)
  return {
    user,
    token
  }
}

module.exports = {
  post,
  updatePost,
  deletePost,
  signUp,
  logIn
}