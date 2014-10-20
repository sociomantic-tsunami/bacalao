module.exports = {

  getEvents: require('./controllers/event.ctrl').getEvents,

  createEvent: require('./controllers/event.ctrl').createEvent,

  createUser: require('./controllers/user.ctrl').createUser
}
