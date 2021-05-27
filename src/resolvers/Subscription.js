const newLinkSub = (parent, args, context) => {
  return context.pubsub.asyncIterator('New_Link')
}
const newVoteSub = (parent, args, context) => {
  return context.pubsub.asyncIterator('NEW_VOTE')
}

const newLink = {
  subscribe: newLinkSub,
  resolver: payload => payload
}

const newVote = {
  subscribe: newVoteSub,
  resolver: payload => payload
}

module.exports = {
  newLink,
  newVote
}