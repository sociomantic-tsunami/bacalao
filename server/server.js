/**
* REST API server entry point
*/
// require('babel-register');
var Hapi = require('hapi');
var Joi = require('joi');
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

// create server instance
var server = new Hapi.Server({ connections: { router: { stripTrailingSlash: true } } });
server.connection({ port: config.port });

server.register( [ require('inert'), require('./config/socketio') ],
  (err) => { if (err) { console.log('Failed to load a plugin:', err); }
});


// TODO: fix bug with lout
// server.register(require('lout'));


server.register({
  register: require('good'),
  options: {
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
  }
}, (err) => { if (err) { throw err; } });

server.log(['status'], 'current NODE_ENV: ' + process.env.NODE_ENV);


require('./config/bell')(server);


server.route([
  {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: __dirname + '/../public',
        listing: true
      }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{param*}',
    handler: {
      directory: {
        path: __dirname + '/../public/fonts'
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
        reply.file(__dirname + '/../public/landing.html');
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
        reply.file(__dirname + '/../public/index.html');
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
      handler: require('./controllers/user.ctrl').logout,
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/api/me',
    config: {
      handler: require('./controllers/user.ctrl').getUser,
      auth: 'session',
      validate: {
        query: false
      },
      response: {
        schema: {
          _id: Joi.string().required(),
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string().email(),
          service: Joi.string(),
          picture: Joi.string(),
          gender: Joi.string(),
          serviceUserId: Joi.string()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/me/location',
    handler: require('./controllers/user.ctrl').updateUserLocation,
    config: {
      auth: 'session',
      validate: {
        payload: {
          latitude:   Joi.number().required(),
          longitude:  Joi.number().required()
        }
      },
      // response: {
      //   schema: false
      // }
    }
  },
  {
    method: 'GET',
    path: '/api/events',
    config: {
      handler: require('./controllers/event.ctrl').getEvents,
      auth: 'session',
      validate: {
        query: false
      },
      response: {
        schema: Joi.array()
      }
    }
  },
  {
    method: 'GET',
    path: '/api/me/upcoming',
    config: {
      handler: require('./controllers/event.ctrl').getUpcomingEvents,
      auth: 'session',
      validate: {
        query: false
      },
      response: {
        schema: Joi.array().items(Joi.string().length(24))
      }
    }
  },
  {
    method: 'POST',
    path: '/api/event',
    config: {
      handler: require('./controllers/event.ctrl').createEvent,
      auth: 'session',
      validate: {
        payload: {
          attendees: Joi.array().items(Joi.string()),
          cid: Joi.string(),
          creator: Joi.string().required(),
          details: Joi.string(),
          maxAttendees: Joi.number().integer(),
          time: Joi.date(),
          venue: Joi.object()
        }
      },
      response: {
        schema: {
          _id: Joi.string(),
          cid: Joi.string(),
          time: Joi.date(),
          venue: Joi.object(),
          maxAttendees: Joi.number().integer(),
          creator: Joi.object(),
          attendees: Joi.array(),
          details : Joi.string()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/event/{eventId}',
    config: {
      handler: require('./controllers/event.ctrl').deleteEvent,
      auth: 'session',
      validate: {
        query: {
          eventId: Joi.string().length(24)
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/event/{eventId}/attendees/{userId}',
    handler: require('./controllers/event.ctrl').joinEvent,
    config: {
      auth: 'session',
      validate: {
        query: {
          eventId: Joi.string().length(24),
          userId: Joi.string().length(24)
        }
      },
      response: {
        schema: {
          eventId: Joi.string().length(24),
          user: Joi.object()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/event/{eventId}/attendees/{userId}',
    handler: require('./controllers/event.ctrl').leaveEvent,
    config: {
      auth: 'session',
      validate: {
        query: {
          eventId: Joi.string().length(24),
          userId: Joi.string().length(24)
        }
      },
      response: {
        schema: {
          eventId: Joi.string().length(24),
          userId: Joi.string().length(24)
        }
      }
    }
  }
]);


mongoose.connection.on('error', server.log.bind(server, ['status'], 'DB connection error:'));
mongoose.connection.once('open', server.log.bind(server, 'status', 'Connceted to mongodb'));
mongoose.connect(config.dburi);


server.start(() => { server.log(['status'], 'Server started: ' + server.info.uri) });

module.exports = server;
