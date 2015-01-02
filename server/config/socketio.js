exports.register = function(server, options, next) {
    var io = require('socket.io')(server.listener);

    next();

    io.set('authorization', function (handshakeData, callback) {

      console.log(arguments);
      console.log(handshakeData.headers.cookie);
      return callback(null, true);

      var cookie = require('cookie');

      var cookies = cookie.parse(handshakeData.headers.cookie);

      if(!cookies.session) { // if no session cookie the user isn't logged in
        return callback(null, false); // error first callback style
      }

      var parsedSession = cookieSessions.util.decode(cookieConfig, cookies.session);

      if(parsedSession &&
         parsedSession.content &&
         parsedSession.content.passport &&
         parsedSession.content.passport.user &&
         parsedSession.content.passport.user._id) {

        return callback(null, true); // allow to open connection
      }

      return callback(null, false); // not authenticated

    });

    // Debugging for socket.io
    // var connections = 0;
    // io.sockets.on('connection', function (socket) {
    //   connections++;
    //   server.log.info('new socket connection. open connections[%s]', connections);

    //   socket.on('disconnect', function () {
    //     connections--;
    //   });
    // });

};


exports.register.attributes = {
  name: 'socketHapi',
  version: '0.1'
};
