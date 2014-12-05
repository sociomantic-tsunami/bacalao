/**
* REST API server entry point
*/
var configExample = require('../config.example.json');
var config = require('../config.json');
var restify = require('restify');
var mongoose = require('mongoose');
var routes = require('./routes');
var logger = require('./utils/logger');
var checkSession = require('./utils/sessionUtils').checkSession;
var userCtrl = require('./controllers/user.ctrl');
var _ = require('underscore');
var sessions = require("client-sessions");
var passport = require('passport');



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

// Default response is json
restify.defaultResponseHeaders = function(data) {
  this.header('Content-Type', 'application/json; charset=utf-8');
};

// create server instance
var server = restify.createServer({
  name: config.name,
  log: logger
});

// Logging
server.on('uncaughtException', function (request, response, route, error) {
  request.log.error(error);
});

server.pre(function (request, response, next) {
    request.log.info({ req: request.url }, 'REQUEST');
    next();
});


// Encrypted cookies for session persistance.
server.use(sessions({
  cookieName: config.cookieKey,
  path: '/api',
  secret: config.cookieSecret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // duration of the cookie in milliseconds, defaults to duration above
    ephemeral: false, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));


// Encrypted cookies for session persistance.
server.use(passport.initialize());
server.use(passport.session());
require('./config/passport')(passport, config);



var io = require('socket.io')(server.server);


// inject the global socket.io obect to all requests
server.use(function(req, res, next) {
  req.socketio = io;
  next();
});


// middleware for parsing requests
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());


// routes
server.get("/auth/facebook", passport.authenticate('facebook'));
server.get("/auth/facebook/callback", passport.authenticate('facebook'), function(req, res) {
  res.header('Location', '/#welcome');
  res.send(302);
});


server.del("/api/user", routes.logout);
server.get("/api/me", routes.getUser);
server.get("/api/events", routes.getEvents);

// reference is currently disabled
server.post("/api/event", checkSession, routes.createEvent);
server.put("/api/event/:eventId/attendees", checkSession, routes.joinEvent);
server.del("/api/event/:eventId/attendees", checkSession, routes.leaveEvent);

server.get(/.*/, restify.serveStatic({
  directory: './public/',
  default: 'index.html'
}));


mongoose.connection.on('error', console.error.bind(server.log, 'DB connection error:'));
mongoose.connection.once('open', function callback () {
    console.log("Connceted to db: ", mongoose.connection.host);
    if(!config.port) {
      console.log("no server port defined in the config");
    	process.exit(1);
    }
    server.listen(config.port, function () {
        console.log("Server started @ " + config.port);
    });
});



// Debugging for socket.io
// var connections = 0;
// io.sockets.on('connection', function (socket) {
//   connections++;
//   server.log.info('new socket connection: ', socket.id );
//   socket.on('disconnect', function () {
//     connections--;
//   });
// });



mongoose.connect(config.dburi);
