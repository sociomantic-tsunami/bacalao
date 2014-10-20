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
      var saveParams = 'cid venue time maxAttendees creator attendees'.split(' ');
      var resParams = saveParams.concat('_id', 'cid');
      var paramsToSave = _.pick(req.params, saveParams);

      var newEvent = new Event(paramsToSave);
      newEvent.save(function (err, newEvent) {
        if (err) return next(err);
        req.log.info('Created event _id:' + newEvent._id );
        var response = _.pick(newEvent, resParams);
        response.cid = req.params.cid;
        res.send(response);
        return next();
      });

  },


}
