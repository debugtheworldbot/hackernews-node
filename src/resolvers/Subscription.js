const newLinkSub = (parent, args, context) => {
  return context.pubsub.asyncIterator('New_Link')
}

const newLink = {
  subscribe: newLinkSub,
  resolver: payload => payload
}

module.exports = {
  newLink
}