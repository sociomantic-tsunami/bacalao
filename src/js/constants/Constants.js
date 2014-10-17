var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_RAW_NODES: null,
    INIT_USER: null,
    CREATE_LUNCH: null,
    JOIN_LUNCH: null,
    LEAVE_LUNCH: null,
    LOGIN_FB: null,
    LOGOUT_FB: null,
    LOGGED_IN_FB: null,
    LOGGED_OUT_FB: null,
    LOGGED_IN_API: null
  }),



  Endpoints: {
    LOGIN: '/api/user'
  }

  // PayloadSources: keyMirror({
  //   SERVER_ACTION: null,
  //   VIEW_ACTION: null
  // })

};
