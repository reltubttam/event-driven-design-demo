const { makeEventEmitter } = require('./eventEmitter')
const myEventEmitter = makeEventEmitter()

let batchChangeTimeOutId = null
let batchChanges = {}

/// order service
myEventEmitter.on('smallChange', (change) => {
  // cancel upcoming batch change
  if (batchChangeTimeOutId) {
    clearTimeout(batchChangeTimeOutId)
  }

  // replace with new batch change
  batchChanges = {
    ...batchChanges,
    ...change
  }

  batchChangeTimeOutId = setTimeout(() => {
    myEventEmitter.emit('batchChange', batchChanges)
  }, 100)
})

myEventEmitter.emit('smallChange', {
  quantity: 1
})

myEventEmitter.emit('smallChange', {
  customerName: 'Elizabeth Windsor'
})

myEventEmitter.emit('smallChange', {
  shippingAddress: 'Westminster, London SW1A 1AA'
})

setTimeout(() => console.log(myEventEmitter.getEventLog()), 600)