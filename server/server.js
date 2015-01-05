/**
* REST API server entry point
*/
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var configExample = require('../config.example.json');
var config = require('./config/config.js');
var mongoose = require('mongoose');
var userCtrl = require('./controllers/user.ctrl');
var _ = require('underscore');

// Determine the environment
var cmdlineEnv = process.argv[2] || '';
if (cmdlineEnv === '-p' || cmdlineEnv.toUpperCase() === '--PRODUCTION') {
    process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

// TODO - replace this with joi schema validation
// _.each(configExample, function(val, k) {
//   if(!config[k]) {
//     console.log('config.json missing configuration key: %s', k);
//     process.exit(1);
//   }
// });

// create server instance
var server = new Hapi.Server({ connections: { router: {stripTrailingSlash: true }}});
server.log(['environment'], process.env.NODE_ENV);
server.connection({ port: config.port, labels: 'app' });
// server.connection({ port: config.streamPort, labels: 'stream' });

require('./config/bell')(server);

server.register({
  register: require('./config/socketio')
}, function(err) {
  if(err) {
    throw err;
  }
});

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
    config: {
      handler: function(request, reply) {
        if(request.auth.isAuthenticated) {
            return reply.redirect('/app');
        }
        reply.file('./public/landing.html');
      },
      auth: {
        mode: 'try',
        strategy: 'session'
      }
    }
  },
  {
    method: 'GET',
    path: '/app',
    config: {
      handler: function(request, reply) {
        reply.file('./public/index.html');
      },
      auth: {
        strategy: 'session'
      },
      plugins: { 'hapi-auth-cookie': { redirectTo: '/' } }
    }
  },
  {
    method: 'GET',
    path: '/auth/logout',
    config: {
      handler: require('./controllers/user.ctrl').logout
    }
  },
  {
    method: 'GET',
    path: '/api/me',
    config: {
      validate: {
        query: false
      },
      handler: require('./controllers/user.ctrl').getUser,
      auth: 'session',
      // response: {
      //   schema: {
      //     _id: Joi.string(),
      //     firstName: Joi.string(),
      //     lastName: Joi.string(),
      //     email: Joi.string().email(),
      //     service: Joi.string(),
      //     picture: Joi.string()
      //   }
      // }
    }
  },
  {
    method: 'GET',
    path: '/api/events',
    handler: require('./controllers/event.ctrl').getEvents,
    config: {
      auth: 'session',
      validate: {
        query: false
      }
    }
  },
  {
    method: 'POST',
    path: '/api/event',
    handler: require('./controllers/event.ctrl').createEvent,
    config: {
      auth: 'session',
      validate: {
        payload: {
          attendees: Joi.array().includes(Joi.string()),
          cid: Joi.string(),
          creator: Joi.string().required(),
          details: Joi.string(),
          maxAttendees: Joi.number().integer(),
          time: Joi.date(),
          venue: Joi.object()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/event/{eventId}',
    handler: require('./controllers/event.ctrl').deleteEvent,
    config: {
      auth: 'session'
    }
  },
  {
    method: 'PUT',
    path: '/api/event/{eventId}/attendees',
    handler: require('./controllers/event.ctrl').joinEvent,
    config: {
      auth: 'session'
    }
  },
  {
    method: 'DELETE',
    path: '/api/event/{eventId}/attendees',
    handler: require('./controllers/event.ctrl').leaveEvent,
    config: {
      auth: 'session'
    }
  }
]);



server.register({
  register: Good,
  options: {
    reporters: [{
        reporter: require('good-console'),
        args:[{ log: '*', response: '*' }]
    }]
  }
}, function (err) {
    if (err) {
      throw err;
    }
  });


mongoose.connection.on('error', server.log.bind(server, ['status'], 'DB connection error:'));
mongoose.connection.once('open', server.log.bind(server, 'status', 'Connceted to mongodb'));
mongoose.connect(config.dburi);
server.start(server.log.bind(server, ['status'], 'Server started @' + config.port));


module.exports = server;
