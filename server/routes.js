var Models = require('./models/models'),
    _ = require('underscore'),
    Event = Models.Event;

exports.getEvents = function (req, res, next) {

    Event.find(function (err, Events) {
      if (err) return console.error(err);
      console.log(Events)
      // if(Events && Events.length > 0) {
      if(Events) {
        res.send(Events);
      }
      return next();
    });

}

exports.createEvent = function (req, res, next) {
    var paramsToSave = _.pick(req.params, 'title', 'venue', 'creator');
    var newEvent = new Event(paramsToSave);
    newEvent.save(function (err, newEvent) {
      if (err) return next(err);
      console.log(newEvent)
      res.send(newEvent);
      return next();
    });

}
