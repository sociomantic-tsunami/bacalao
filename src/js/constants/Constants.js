var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_EVENTS: null,
    INIT_USER: null,
    CREATE_EVENT: null,
    CREATED_EVENT: null,
    JOIN_EVENT: null,
    JOINED_EVENT: null,
    LEAVE_EVENT: null,
    LEFT_EVENT: null,
    LOGIN_FB: null,
    LOGOUT_FB: null,
    LOGGED_IN_FB: null,
    LOGGED_OUT_FB: null,
    LOGGED_IN_API: null
  }),


  Endpoints: {
    LOGIN: '/api/user',
    EVENT: '/api/event',
    EVENTS: '/api/events',
    JOIN_EVENT: '/api/event/[eventId]/attendees',
    LEAVE_EVENT: '/api/event/[eventId]/attendees'
  }

  // PayloadSources: keyMirror({
  //   SERVER_ACTION: null,
  //   VIEW_ACTION: null
  // })

};
