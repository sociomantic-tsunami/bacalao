var Event = require('../models/event.model');
var User = require('../models/user.model');
var _ = require('underscore');
var Q = require('q');
var clientConstants = require('../../src/js/constants/Constants');
var moment = require('moment');
var Boom = require('boom');
var mongoose = require('mongoose');

module.exports = {

  getEvents: function (request, reply) {

    var roundHourAgo = moment().subtract(1, 'hour').startOf('hour').toDate();
    var query = Event.find({ time: { '$gte': roundHourAgo } });

    if(request.auth.credentials.service === 'yammer') {
      // get network events or public ones without a network id
      // query.or([{ networkId : request.auth.credentials.networkId }, { networkId: { exists: false } }]);
      // query.or([{ networkId: { exists: false } }, { networkId : request.auth.credentials.networkId }]);
      // query.where('networkId').equals(request.auth.credentials.networkId);
      query.in('networkId', [ 'public', request.auth.credentials.networkId ]);
    } else {
      // only public events otherwise
      query.where('networkId').equals('public');
    }

    query
      .select('title venue time details attendees maxAttendees creator')
      .sort({ time: 'asc'})
      .populate('attendees', 'firstName lastName picture')
      .populate('creator', 'firstName lastName picture')
      .exec(function (err, events) {
        if(err) {
          return reply(Boom.badImplementation(err));
        }

        reply(events);
      });
  },

  // Upcoming events for the logged in user
  getUpcomingEvents: function(request, reply) {
    var userId = request.auth.credentials._id;
    var roundHourAgo = moment().subtract(1, 'hour').startOf('hour').toDate();

    Event
      .find(
        { time: { '$gte': roundHourAgo },
          attendees : userId },
        '_id id')
      .sort({ time: 'asc'})
      .exec(function (err, events) {
        if(err) {
          return reply(Boom.badImplementation(err));
        }
        // reply with an array of strings (hence the use of id)
        reply(_.pluck(events,'id'));
      });
  },



  createEvent: function (request, reply) {
      var userId = request.auth.credentials._id;
      // check the creator === request.auth.id
      if(request.payload.creator !== userId) {
        return reply(Boom.forbidden('You can only create an event as your self'));
      }

      if(request.payload.attendees[0] !== userId) {
        return reply(Boom.forbidden('You can only join as your self'));
      }



      var saveParams = 'venue time maxAttendees creator attendees details'.split(' ');
      var resParams = saveParams.concat('_id', 'cid');
      var paramsToSave = _.pick(request.payload, saveParams);

      if(request.auth.credentials.service === 'yammer') {
        paramsToSave.networkId = request.auth.credentials.networkId;
      }

      var newEvent = new Event(paramsToSave);
      newEvent.save(function (err, newEvent) {
        if(err) {
            return reply(Boom.badImplementation(err));
        }

        newEvent
          .populate('attendees', 'firstName lastName picture')
          .populate('creator', 'firstName lastName picture', function(err, newEvent) {
            if(err) {
              return reply(Boom.badImplementation(err));
            }
            var response = _.pick(newEvent, resParams);
            response.cid = request.payload.cid;
            response._id = response._id.toString();

            reply(response);


            var socketId = request.headers['x-socket-id'];
            var socket = request.server.plugins.socketio.io.sockets.connected[socketId] || false;
            if(newEvent.isPublic) {
              socket && socket.broadcast.emit(clientConstants.ActionTypes.CREATED_EVENT, _.omit(response, 'cid'));
            } else {
              socket && socket.broadcast.to(request.auth.credentials.networkId).emit(clientConstants.ActionTypes.CREATED_EVENT, _.omit(response, 'cid'));
            }
            return;
          });


      });

  },


  deleteEvent: function (request, reply) {
    var userId = request.auth.credentials._id;

    Event.findById(request.params.eventId, 'creator attendees', function(err, event) {
        if(err) {
          return reply(Boom.badImplementation());
        }

        if(!event) {
          return reply(Boom.notFound('Event not found'));
        }

        if(event.creator.toString() !== userId) {
          return reply(Boom.forbidden('Only the creator can delete an event'));
        }

        if((event.attendees.length > 1 ||
            (event.attendees.length === 1 && event.attendees[0].toString() !== userId) )) {
          return reply(new Boom.badData('Cannot delete an event with attendees'));
        }

        event.remove(function(err, event){
          if(err) {
            return reply(Boom.badImplementation(err));
          }

          var response = {
            removed: true,
            eventId: event.id
          };

          reply(response);
          request.server.plugins.socketio.io.emit();

          var socketId = request.headers['x-socket-id'];
          var socket = request.server.plugins.socketio.io.sockets.connected[socketId] || false;


          if(event.isPublic) {
            socket && socket.broadcast.emit(clientConstants.ActionTypes.DELETED_EVENT, response);
          } else {
            socket && socket.broadcast.to(request.auth.credentials.networkId)
              .emit(clientConstants.ActionTypes.DELETED_EVENT, response);
          }
          return;
        });
    });

  },


  joinEvent: function (request, reply) {
    var userId = request.auth.credentials._id;

    if(request.params.userId !== userId) {
      return reply(Boom.forbidden('You can only join an event as your self'));
    }

    // TODO if the event has a networkId only allow joining if
    // the user is in the same networkId

    Event.update(
      { _id: request.params.eventId },
      { $addToSet: { attendees: request.params.userId }},
      function(err, numberAffected){
        if(err) {
          return reply(Boom.badImplementation(err));
        }

        User.findById(request.params.userId, 'firstName lastName picture', function(err, user) {
          if(err) {
            return reply(Boom.badImplementation(err));
          }

          var response = {
            eventId: request.params.eventId,
            user: user
          };

          reply(response);

          var socketId = request.headers['x-socket-id'];
          var socket = request.server.plugins.socketio.io.sockets.connected[socketId] || false;

          // TODO if the event has a networkId only broadcast to the room of networkId
          socket && socket.broadcast.emit(clientConstants.ActionTypes.JOINED_EVENT, response);
          return;
        });
      });
  },


  leaveEvent: function(request, reply) {
    var userId = request.auth.credentials._id;

    if(request.params.userId !== userId) {
      return reply(Boom.forbidden('You can only leave an event as your self'));
    }

    Event.update(
      { _id: request.params.eventId },
      { $pull: { attendees: request.params.userId }},
      function(err, numberAffected){
        if(err) {
          return reply(Boom.badImplementation(err));
        }

        var response = {
          eventId: request.params.eventId,
          userId: request.params.userId
        };
        reply(response);

          var socketId = request.headers['x-socket-id'];
          var socket = request.server.plugins.socketio.io.sockets.connected[socketId] || false;

          // TODO if the event has a networkId only broadcast to the room of networkId
          socket && socket.broadcast.emit(clientConstants.ActionTypes.LEFT_EVENT, response);
          return;
      });
  }


};
