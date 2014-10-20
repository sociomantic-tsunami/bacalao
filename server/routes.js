module.exports = {

  getEvents: require('./controllers/event.ctrl').getEvents,

  createEvent: require('./controllers/event.ctrl').createEvent,

  joinEvent: require('./controllers/event.ctrl').joinEvent,

  createUser: require('./controllers/user.ctrl').createUser
}
