var socketio = require('socket.io-client');
var Constants = require('../constants/Constants');
var EventServerActionCreators = require('../actions/EventServerActionCreators');

var _socket;

var SocketUtils = {
  init: function() {
    _socket = socketio();

    _socket.on(Constants.ActionTypes.CREATED_EVENT, function(data) {
      EventServerActionCreators.createdEvent(data);
    });

  }
}

module.exports = SocketUtils