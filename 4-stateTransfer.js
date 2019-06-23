const { makeEventEmitter } = require('./eventEmitter')
const myEventEmitter = makeEventEmitter()

/// discout service, sales every 333ms :D
let onSaleInDiscountService = true
let setIntervalId = setInterval(() => {
  onSaleInDiscountService = !onSaleInDiscountService
  myEventEmitter.emit('sale:statusChange', {
    isOnSale: onSaleInDiscountService
  })
}, 333)

/// order service
let onSaleInOrderService = true
myEventEmitter.on('sale:statusChange', (payload) => {
  onSaleInOrderService = payload.isOnSale
})

myEventEmitter.on('order:initialized', (payload) => {
  // do some stuff
  myEventEmitter.emit('order:finalized', {
    ...payload,
    isOnSale: onSaleInOrderService,
    finalStuffDone: true
  })
})

myEventEmitter.on('order:finalized', (payload) => {
  // done
})

myEventEmitter.emit('order:initialized', {
  initialStuffDone: true
})

//// replay
function replay(){
  /// bypass discout service
  clearInterval(setIntervalId)
  /// restore last snapshot
  onSaleInOrderService = true

  const eventsToReplay = myEventEmitter.getEventLog().filter(({event, action}) => {
    return action == 'emitted' && (event == 'order:initialized' || event == 'sale:statusChange')
  })
  myEventEmitter.clearEventLog()
  eventsToReplay.forEach(({event, payload}) => myEventEmitter.emit(event, payload))
}

///
setTimeout(replay, 500)
setTimeout(() => {
  clearInterval(setIntervalId)
  console.log(myEventEmitter.getEventLog())
}, 600)