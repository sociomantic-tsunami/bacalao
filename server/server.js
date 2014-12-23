/**
* REST API server entry point
*/
var Hapi = require('hapi');
var Good = require('good');
var configExample = require('../config.example.json');
var config = require('../config.json');
var mongoose = require('mongoose');
var routes = require('./routes');
var ensureAuthenticated = require('./utils/sessionUtils').ensureAuthenticated;
var userCtrl = require('./controllers/user.ctrl');
var _ = require('underscore');
var cookieSessions = require("client-sessions");
var passport = require('passport');
var cookieConfig = require('./config/cookieSession');

// Determine the environment
var cmdlineEnv = process.argv[2] || 'default';
if (cmdlineEnv == '-d' || cmdlineEnv.toUpperCase() == '--DEVELOPMENT') {
    process.env.NODE_ENV = 'development';
} else if (cmdlineEnv == '-p' || cmdlineEnv.toUpperCase() == '--PRODUCTION') {
    process.env.NODE_ENV = 'production';
} else {
  console.log("Usage: [node|nodemon] server.js [-d|-p|--development|--production]");
  console.log("Defaulting to Development");
  process.env.NODE_ENV = 'development';
}

console.log('Env: ' + process.env.NODE_ENV);

// Inform use if the config is missing config keys
_.each(configExample, function(val, k) {
  if(!config[k]) {
    console.log('config.json missing configuration key: %s', k);
    process.exit(1);
  }
});

// create server instance
var server = new Hapi.Server({ connections: { router: {stripTrailingSlash: true }}});
server.connection({ port: config.port });


require('./config/bell')(server);


// Encrypted cookies for session persistance.
// server.use(cookieSessions(cookieConfig));


// Encrypted cookies for session persistance.
// server.use(passport.initialize());
// server.use(passport.session());
// require('./config/passport')(passport, config);



// var io = require('socket.io')(server.server);


// inject the global socket.io obect to all requests
// server.use(function(req, res, next) {
//   req.socketio = io;
//   next();
// });


server.route([
  {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: './public',
        listing: true
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.file('./public/landing.html');
    }
  },
  {
    method: 'GET',
    path: '/app',
    handler: function(request, reply) {
      reply.file('./public/index.html');
    }
  },
  // {
  //   method: 'GET',
  //   path: '/auth/facebook',
  //   handler: passport.authenticate('facebook')
  // },
  // {
  //   method: 'GET',
  //   path: '/auth/facebook/callback',
  //   handler: function(reqst, reply) {
  //     passport.authenticate('facebook');
  //     // if successful redirect to app...
  //     // res.send(302);
  //     // res.redirect....
  //   }
  // },
  {
    method: 'DELETE',
    path: '/api/user',
    // ensureAuthenticated
    handler: routes.logout
  },
  {
    method: 'GET',
    path: '/api/me',
    handler: routes.getUser,
    config: {
      auth: 'facebook'
    }
  },
  {
    method: 'GET',
    path: '/api/events',
    // ensureAuthenticated
    handler: routes.getEvents
  },
  {
    method: 'POST',
    path: '/api/event',
    // ensureAuthenticated
    handler: routes.createEvent
  },
  {
    method: 'DELETE',
    path: '/api/event/{eventId}',
    // ensureAuthenticated
    handler: routes.deleteEvent
  },
  {
    method: 'PUT',
    path: '/api/event/{eventId}/attendees',
    // ensureAuthenticated
    handler: routes.joinEvent
  },
  {
    method: 'DELETE',
    path: '/api/event/{eventId}/attendees',
    // ensureAuthenticated
    handler: routes.leaveEvent
  }
]);



// server.get(/.*/, restify.serveStatic({
//   directory: './public/',
//   default: 'index.html'
// }));


// server.get("/", function(req, res, next) {
//   if(req.user && req.user._id) {
//   // THE USER HAS THE COOKIE AND IS LOGGED IN
//     res.header('Location', '/app');
//     res.send(302);
//   } else {
//     // serve the landing page
//     // res.send('landing.html')
//     res.json({ message: 'welcome to landing page'});
//   }
// });

// server.get(/\/app\/?/, function(req, res, next) {
//   if(!req.user) {
//   // THE USER HAS THE COOKIE AND IS LOGGED IN
//     res.header('Location', '/');
//     res.send(302);
//   } else {
//     // serve the app page
//     // res.send('index.html')
//     res.json({ message: 'welcome to the BABYLON!'});
//   }
// });

server.register({
  register: Good,
  options: {
      reporters: [{
          reporter: require('good-console'),
          args:[{ log: '*', response: '*' }]
      }]
  }
  },
  function (err) {
    if (err) {
      throw err;
    }
 });




mongoose.connection.on('error', server.log.bind(server.log, 'DB connection error:'));
mongoose.connection.once('open', function callback () {
    server.log('status', 'Connceted to db: ' + mongoose.connection.host);
    if(!config.port) {
      server.log('status', 'no server port defined in the config');
    	process.exit(1);
    }
    server.start(function () {
        server.log('status', 'Server started @' + config.port);
    });
});


// io.set('authorization', function (handshakeData, callback) {

//   var cookie = require('cookie');

//   var cookies = cookie.parse(handshakeData.headers.cookie);

//   if(!cookies.session) { // if no session cookie the user isn't logged in
//     return callback(null, false); // error first callback style
//   }

//   var parsedSession = cookieSessions.util.decode(cookieConfig, cookies.session);

//   if(parsedSession &&
//      parsedSession.content &&
//      parsedSession.content.passport &&
//      parsedSession.content.passport.user &&
//      parsedSession.content.passport.user._id) {

//     return callback(null, true); // allow to open connection
//   }

//   return callback(null, false); // not authenticated

// });

// Debugging for socket.io
// var connections = 0;
// io.sockets.on('connection', function (socket) {
//   connections++;
//   server.log.info('new socket connection. open connections[%s]', connections);

//   socket.on('disconnect', function () {
//     connections--;
//   });
// });




mongoose.connect(config.dburi);

