var Event = require('../models/event.model');
var User = require('../models/user.model');
var _ = require('underscore');
var authValidator = require('../utils/authValidator');
var Q = require('q');
var clientConstants = require('../../src/js/constants/Constants');
var moment = require('moment');

module.exports = {

  getEvents: function (req, res, next) {
    var roundHourAgo = moment().subtract(1, 'hour').startOf('hour').toDate();

    Event
      .find(
        // { time: { '$gte': roundHourAgo } },
      'title venue time attendees maxAttendees creator')
      .populate('attendees', 'firstName lastName picture')
      .populate('creator', 'firstName lastName picture')
      .exec(function (err, events) {
        if(err) {
          return next(err);
        }
        res.send(events);
        return next();
      });

  },

  createEvent: function (req, res, next) {
      var saveParams = 'venue time maxAttendees creator attendees'.split(' ');
      var resParams = saveParams.concat('_id', 'cid');
      var paramsToSave = _.pick(req.params, saveParams);

      var newEvent = new Event(paramsToSave);
      newEvent.save(function (err, newEvent)
      {
        if(err) {
          return next(err);
        }
        req.log.info('Created event _id:' + newEvent._id );

        newEvent
          .populate('attendees', 'firstName lastName picture')
          .populate('creator', 'firstName lastName picture', function(err, newEvent) {
            if(err) {
              return next(err);
            }
            var response = _.pick(newEvent, resParams);
            response.cid = req.params.cid;
            res.send(response);
            // makes more sense to use this - socket.broadcast.emit('hi');
            // which doesn't send to this socket.
            // TODO - use this once sockets are integrated with sessions
            req.socketio.emit(clientConstants.ActionTypes.CREATED_EVENT, _.omit(response,
              'cid'));
            return next();

          });


      });

  },

  joinEvent: function (req, res, next) {
    // TODO - only proceed if the userId matches the sessionUserId

    Event.update(
      { _id: req.params.eventId },
      { $addToSet: { attendees: req.params.userId }},
      // function(err, numberAffected){
      function(err, numberAffected, raw){
        if(err) {
          return next(err);
        }

        req.log.info('user: ' + req.params.userId + ' joined event:' + req.params.eventId);
        res.send(200);
        return next();
      });
  },


  leaveEvent: function(req, res, next) {
    // TODO - only proceed if the userId matches the sessionUserId

    Event.update(
      { _id: req.params.eventId },
      { $pull: { attendees: req.params.userId }},
      // function(err, numberAffected){
      function(err, numberAffected, raw){
        if(err) {
          return next(err);
        }

        req.log.info('user: ' + req.params.userId + ' left event:' + req.params.eventId);
        res.send(200);
        return next();
      });
  }


}
