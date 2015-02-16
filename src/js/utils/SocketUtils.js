var socketio = require('socket.io-client');
var Constants = require('../constants/Constants');
var EventServerActionCreators = require('../actions/EventServerActionCreators');
var UserStore = require('../stores/UserStore');

var _socket = null;

var SocketUtils = {

  init: function() {
      _socket = socketio();

    _socket.on(Constants.ActionTypes.CREATED_EVENT, function(data) {
      EventServerActionCreators.createdEvent(data);
    });


    _socket.on(Constants.ActionTypes.JOINED_EVENT, function(user) {
      EventServerActionCreators.joinedEvent(user);
    });

    _socket.on(Constants.ActionTypes.LEFT_EVENT, function(event) {
      EventServerActionCreators.leftEvent(event);
    });

    _socket.on(Constants.ActionTypes.DELETED_EVENT, function(event) {
      EventServerActionCreators.deletedEvent(event);
    });
  },

  getSocketId: function() {
    return _socket && _socket.io && _socket.io.engine && _socket.io.engine.id;
  }
};

module.exports = SocketUtils;
