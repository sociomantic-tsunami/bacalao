module.exports = {
  // User:
  login: require('./controllers/user.ctrl').login,

  // Events:
  getEvents: require('./controllers/event.ctrl').getEvents,

  createEvent: require('./controllers/event.ctrl').createEvent,

  joinEvent: require('./controllers/event.ctrl').joinEvent,

  leaveEvent: require('./controllers/event.ctrl').leaveEvent

}
