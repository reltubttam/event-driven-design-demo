const { makeEventEmitter } = require('./eventEmitter')
const myEventEmitter = makeEventEmitter()

/// email service
myEventEmitter.on('order:finalized', (payload) => {
  // send them a confirmation
})

/// order service
myEventEmitter.emit('order:finalized', {
  finalStuffDone: true
})

setTimeout(() => console.log(myEventEmitter.getEventLog()), 600)