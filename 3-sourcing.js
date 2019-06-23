const { makeEventEmitter } = require('./eventEmitter')
const myEventEmitter = makeEventEmitter()

/// order service
myEventEmitter.on('order:initialized', (payload) => {
  // do some stuff
  myEventEmitter.emit('order:finalized', {
    ...payload,
    finalStuffDone: true
  })
})

myEventEmitter.on('order:finalized', (payload) => {
  // done
})

// create the order
myEventEmitter.emit('order:initialized', {
  initialStuffDone: true
})

//// replay
function replay(){
  const eventsToReplay = myEventEmitter.getEventLog().filter(({event, action}) => {
    return action == 'emitted' && event == 'order:initialized'
  })
  myEventEmitter.clearEventLog()
  eventsToReplay.forEach(({event, payload}) => myEventEmitter.emit(event, payload))
}

setTimeout(replay, 500)
setTimeout(() => console.log(myEventEmitter.getEventLog()), 600)