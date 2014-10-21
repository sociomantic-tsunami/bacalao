var Event = require('../models/event.model');
var _ = require('underscore');
var authValidator = require('../utils/authValidator');
var Q = require('q');


module.exports = {

  getEvents: function (req, res, next) {
      Event.find(function (err, Events) {
        if(err) {
          return next(err);
        }
        res.send(Events);
        return next();
      });

  },

  createEvent: function (req, res, next) {
      var saveParams = 'cid venue time maxAttendees creator attendees'.split(' ');
      var resParams = saveParams.concat('_id', 'cid');
      var paramsToSave = _.pick(req.params, saveParams);

      var newEvent = new Event(paramsToSave);
      newEvent.save(function (err, newEvent)
      {
        if(err) {
          return next(err);
        }
        req.log.info('Created event _id:' + newEvent._id );
        var response = _.pick(newEvent, resParams);
        response.cid = req.params.cid;
        res.send(response);
        return next();
      });

  },

  joinEvent: function (req, res, next) {
    req.log.warn('joinEvent:' + req.params );
  }


}
