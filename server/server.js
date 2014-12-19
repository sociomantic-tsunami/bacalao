/**
* REST API server entry point
*/
var configExample = require('../config.example.json');
var config = require('../config.json');
var restify = require('restify');
var mongoose = require('mongoose');
var routes = require('./routes');
var logger = require('./utils/logger');
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
server.use(cookieSessions(cookieConfig));


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
  res.header('Location', '/app');
  res.send(302);
});


server.del("/api/user", ensureAuthenticated, routes.logout);
server.get("/api/me", ensureAuthenticated, routes.getUser);

server.get("/api/events", ensureAuthenticated, routes.getEvents);
server.post("/api/event", ensureAuthenticated, routes.createEvent);
server.del("/api/event/:eventId", ensureAuthenticated, routes.deleteEvent);
server.put("/api/event/:eventId/attendees", ensureAuthenticated, routes.joinEvent);
server.del("/api/event/:eventId/attendees", ensureAuthenticated, routes.leaveEvent);

server.get("/", function(req, res, next) {
  if(req.user && req.user._id) {
  // THE USER HAS THE COOKIE AND IS LOGGED IN
    res.header('Location', '/app');
    res.send(302);
  } else {
    // serve the landing page
    // res.send('landing.html')
    res.json({ message: 'welcome to landing page'});
  }
});

server.get(/\/app\/?/, function(req, res, next) {
  if(!req.user) {
  // THE USER HAS THE COOKIE AND IS LOGGED IN
    res.header('Location', '/');
    res.send(302);
  } else {
    // serve the app page
    // res.send('index.html')
    res.json({ message: 'welcome to the BABYLON!'});
  }
});



// server.get(/.*/, restify.serveStatic({
//   directory: './public/',
//   default: 'index.html'
// }));


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


  io.set('authorization', function (handshakeData, callback) {

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
var connections = 0;
io.sockets.on('connection', function (socket) {
  connections++;
  server.log.info('new socket connection. open connections[%s]', connections);

  socket.on('disconnect', function () {
    connections--;
  });
});




mongoose.connect(config.dburi);

