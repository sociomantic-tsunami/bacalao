var socketIO = require('socket.io');
var config = require('./config.js');
var statehood = require('statehood');
var _ = require('underscore');

exports.register = function(server, options, next) {
    var io = socketIO(server.listener); // socket server listener

    var def = new statehood.Definitions(config.statehood);



    io.set('authorization', function (handshakeData, accept) {
      var cookie = handshakeData.headers.cookie;
      if(cookie) {
        def.parse(cookie, function(err, state, failed) {
          // console.log('session', state.session);
          if(state && state.session && state.session._id) {
            return accept(null, true);
          }
        });
      } else {
        return accept('No session cookie.', false);
      }

      return accept(null, false);

    });

    // Debugging for socket.io
    var connections = 0;
    io.sockets.on('connection', function (socket) {
      connections++;
      server.log(['socket'], 'new connection. open socket connections: ' + connections);

      socket.on('disconnect', function () {
        connections--;
        server.log(['socket'], 'closed connection. open socket connections: ' + connections);
      });
    });

    server.expose('io', io);
    next();
};


exports.register.attributes = {
  name: 'socketio',
  version: '0.1'
};
