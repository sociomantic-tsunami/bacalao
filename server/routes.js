var Models = require('./models/models'),
    _ = require('underscore'),
    Mongoose = require('mongoose'),
    authValidator = require('./utils/authValidator'),
    Event = Models.Event,
    User = Models.User;

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


exports.createUser = function (req, res, next) {
    var fields = '_id firstName lastName middleName gender email picture service serviceUserId accessToken tokenExpiration'.split(' ');
    var paramsToSave = _.pick(req.params, fields);
    var user = new User(paramsToSave);

    authValidator.validateToken(paramsToSave.accessToken)
    .then(function() {
      User.findOneAndUpdate(
        { serviceUserId : paramsToSave.serviceUserId },
        paramsToSave,
        { upsert : true },
        function (err, user) {
          if (err) return next(err);
          res.send(user);
          return next();
      });
    }, function(error) {
      res.send(401);
      req.log.warn(error);
      return next();
    });

}
