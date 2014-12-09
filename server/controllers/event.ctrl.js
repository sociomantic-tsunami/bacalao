var Event = require('../models/event.model');
var User = require('../models/user.model');
var restify = require('restify');
var _ = require('underscore');
var Q = require('q');
var clientConstants = require('../../src/js/constants/Constants');
var errors = require('restify').errors;
var moment = require('moment');
var sessionUtils = require('../utils/sessionUtils');


module.exports = {

  getEvents: function (req, res, next) {
    var roundHourAgo = moment().subtract(1, 'hour').startOf('hour').toDate();

    Event
      .find({ time: { '$gte': roundHourAgo } }, 'title venue time details attendees maxAttendees creator')
      .sort({ time: 'asc'})
      .populate('attendees', 'firstName lastName picture')
      .populate('creator', 'firstName lastName picture')
      .exec(function (err, events) {
        if(err) {
          req.log.error(err);
          return next(new restify.errors.InternalError);
        }
        res.json(events);
        return next();
      });

  },

  createEvent: function (req, res, next) {
      var saveParams = 'venue time maxAttendees creator attendees details'.split(' ');
      var resParams = saveParams.concat('_id', 'cid');
      var paramsToSave = _.pick(req.params, saveParams);

      var newEvent = new Event(paramsToSave);
      newEvent.save(function (err, newEvent)
      {
        if(err) {
          req.log.error(err);
          if(err.name === 'ValidationError') {
            // TODO - pass the validation errors to the client
            return next(new restify.errors.BadRequestError());
          } else {
            return next(new restify.errors.InternalError);
          }
        }
        req.log.info('Created event _id:' + newEvent._id );

        newEvent
          .populate('attendees', 'firstName lastName picture')
          .populate('creator', 'firstName lastName picture', function(err, newEvent) {
            if(err) {
              req.log.error(err);
              return next(new restify.errors.InternalError);
            }
            var response = _.pick(newEvent, resParams);
            response.cid = req.params.cid;
            res.json(response);
            // makes more sense to use this - socket.broadcast.emit('hi');
            // which doesn't send to this socket.
            // TODO - use this once sockets are integrated with sessions
            req.socketio.emit(clientConstants.ActionTypes.CREATED_EVENT, _.omit(response,
              'cid'));
            return next();

          });


      });

  },


  deleteEvent: function (req, res, next) {
    if(!sessionUtils.isUserMatchingSession(req, req.params.userId)) {
        return next(new errors.NotAuthorizedError('You can only join as your self'));
    }

    if(!req.params.eventId || req.params.eventId === 'undefined') {
        return next(new errors.UnprocessableEntityError('Event Id is invalid'));
    }


    Event.findById(req.params.eventId, 'creator attendees', function(err, event) {
        if(err) {
          req.log.error(err);
          return next(new restify.errors.InternalError);
        }

        if(event.attendees.length > 1 ||
          (event.attendees.length === 1 && event.attendees[0] !== req.user._id) ) {
          return next(new errors.UnprocessableEntityError('Cannot delete an event with attendees'));
        }

        event.remove(function(err, event){
          var response = {
            removed: true,
            eventId: event._id
          };

          res.json(response);
          req.socketio.emit(clientConstants.ActionTypes.REMOVED_EVENT, response);

        });

        return next();

    });

  },

  joinEvent: function (req, res, next) {
    if(!sessionUtils.isUserMatchingSession(req, req.params.userId)) {
        return next(new errors.NotAuthorizedError('You can only join as your self'));
    }

    if(!req.params.eventId || req.params.eventId === 'undefined') {
        return next(new errors.UnprocessableEntityError('Event Id is invalid'));
    }


    Event.update(
      { _id: req.params.eventId },
      { $addToSet: { attendees: req.params.userId }},
      // function(err, numberAffected){
      function(err, numberAffected, raw){
        if(err) {
          req.log.error(err);
          return next(new restify.errors.InternalError);
        }

        req.log.info('user: ' + req.params.userId + ' joined event:' + req.params.eventId);
        User.findById(req.params.userId, 'firstName lastName picture', function(err, user) {
          if(err) {
            req.log.error(err);
            return next(new restify.errors.InternalError);
          }
          var response = {
            eventId: req.params.eventId,
            user: user
          };
          res.json(response);
          req.socketio.emit(clientConstants.ActionTypes.JOINED_EVENT, response);
        });
        return next();

      });
  },


  leaveEvent: function(req, res, next) {
    if(!sessionUtils.isUserMatchingSession(req, req.params.userId)) {
        return next(new errors.NotAuthorizedError('You can only laeve as your self'));
    }

    if(!req.params.eventId || req.params.eventId === 'undefined') {
        return next(new errors.UnprocessableEntityError('Event Id is invalid'));
    }


    Event.update(
      { _id: req.params.eventId },
      { $pull: { attendees: req.params.userId }},
      // function(err, numberAffected){
      function(err, numberAffected, raw){
        if(err) {
          req.log.error(err);
          return next(new restify.errors.InternalError);
        }

        req.log.info('user: ' + req.params.userId + ' left event:' + req.params.eventId);
        var response = {
          eventId: req.params.eventId,
          userId: req.params.userId
        };
        res.json(response);
        req.socketio.emit(clientConstants.ActionTypes.LEFT_EVENT, response);
        return next();
      });
  }


};
