var keyMirror = require('keymirror');

module.exports = {


  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    RECEIVE_RAW_EVENTS: null,
    RECEIVE_UPCOMING_EVENTS: null,
    ROUTE_CHANGE: null,
    GOT_LOCATION: null,
    INIT_USER: null,
    CREATE_EVENT: null,
    CREATED_EVENT: null,
    JOIN_EVENT: null,
    JOINED_EVENT: null,
    LEAVE_EVENT: null,
    LEFT_EVENT: null,
    DELETE_EVENT: null,
    DELETED_EVENT: null,
    GOT_USER_INFO: null
  }),


  Endpoints: {
    LOGOUT: '/auth/logout',
    ME: '/api/me',
    UPDATE_LOCATION: '/api/me/location',
    EVENT: '/api/event',
    DELETE_EVENT: '/api/event/[eventId]',
    EVENTS: '/api/events',
    JOIN_EVENT: '/api/event/[eventId]/attendees/[userId]',
    LEAVE_EVENT: '/api/event/[eventId]/attendees/[userId]',
    UPCOMING : '/api/me/upcoming'
  }

};
