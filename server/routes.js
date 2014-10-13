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
    paramsToSave.tokenExpiration = new Date(paramsToSave.tokenExpiration * 1000);
    paramsToSave.updated = new Date();



    authValidator.validateToken(paramsToSave.accessToken)
      .then(function() {
        if(paramsToSave._id) {
          var conditions = { _id : paramsToSave._id };
          paramsToSave.updated = new Date();
          return User.update(conditions, paramsToSave);
        } else {
          return User.create(paramsToSave);
        }
      })
      .fail(function(error) {
        console.log('fail...');
        res.send(401);
        req.log.warn(error);
        return next(error);
      }).done(function(user) {
        req.log.info(arguments);
        if(user._id) {
          res.send(_.pick(user, '_id', 'serviceUserId'));
        } else {
          res.send(200);
        }
        return next();
      })

}
