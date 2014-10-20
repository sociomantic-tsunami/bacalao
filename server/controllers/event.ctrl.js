var Models = require('../models/models'),
    _ = require('underscore'),
    authValidator = require('../utils/authValidator'),
    Event = Models.Event,
    Q = require('q')


module.exports = {

  getEvents: function (req, res, next) {

      Event.find(function (err, Events) {
        if (err) return console.error(err);
        console.log(Events)
        // if(Events && Events.length > 0) {
        if(Events) {
          res.send(Events);
        }
        return next();
      });

  },

  createEvent: function (req, res, next) {
      var params = 'cid time venue maxAttendees creator attendees'.split(' ');
      var paramsToSave = _.pick(req.params, params);
      var newEvent = new Event(paramsToSave);
      newEvent.save(function (err, newEvent) {
        if (err) return next(err);
        console.log(newEvent);
        res.send(_.pick(newEvent, params.push('_id', 'cid')));
        return next();
      });

  },


}
