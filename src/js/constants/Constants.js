var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_EVENTS: null,
    INIT_USER: null,
    CREATE_EVENT: null,
    JOIN_LUNCH: null,
    LEAVE_LUNCH: null,
    LOGIN_FB: null,
    LOGOUT_FB: null,
    LOGGED_IN_FB: null,
    LOGGED_OUT_FB: null,
    LOGGED_IN_API: null
  }),



  Endpoints: {
    LOGIN: '/api/user',
    EVENT: '/api/event'
  }

  // PayloadSources: keyMirror({
  //   SERVER_ACTION: null,
  //   VIEW_ACTION: null
  // })

};
