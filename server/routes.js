module.exports = {
  // User:
  createUser: require('./controllers/user.ctrl').createUser,

  // Events:
  getEvents: require('./controllers/event.ctrl').getEvents,

  createEvent: require('./controllers/event.ctrl').createEvent,

  joinEvent: require('./controllers/event.ctrl').joinEvent,
  
  leaveEvent: require('./controllers/event.ctrl').leaveEvent

}
