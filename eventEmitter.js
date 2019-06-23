const EventEmitter = require('events');

function makeEventEmitter (){
  const emitter = new EventEmitter();

  let eventLog = []
  let nextHandlerId = 1
  return {
    on: (event, handler) => {
      const handlerId = nextHandlerId
      nextHandlerId ++
      // eventLog.push({
      //   handlerId,
      //   event, 
      //   action: 'registered'
      // })

      emitter.on(event, (payload) => {
        eventLog.push({
          handlerId, 
          event, 
          payload, 
          action: 'handled'
        })
        handler(payload)
      })
    },

    emit: (event, payload) => {
      eventLog.push({
        event, 
        payload, 
        action: 'emitted'
      })
      emitter.emit(event, payload)
    },

    getEventLog: () => eventLog,

    clearEventLog: () => {
      eventLog = []
    }
  }
}

module.exports = { 
  makeEventEmitter 
}
