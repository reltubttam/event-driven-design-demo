const { makeEventEmitter } = require('./eventEmitter')
const myEventEmitter = makeEventEmitter()

/// order service
myEventEmitter.on('order:command:update', (payload) => {
  myEventEmitter.emit('order:query:update', payload)
})

/// api service
myEventEmitter.on('order:query:update', (payload) => {
  // continue 
})

myEventEmitter.emit('order:command:update', {
  quantity: 12
})

setTimeout(() => console.log(myEventEmitter.getEventLog()), 600)