var Models = require('./models/models'),
    _ = require('underscore'),
    Mongoose = require('mongoose'),
    authValidator = require('./utils/authValidator'),
    Event = Models.Event,
    User = Models.User,
    Q = require('q');


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
        if(!paramsToSave._id && !paramsToSave.serviceUserId ) {
          throw new Error('A serviceUserId or _id must be supplied');
        }

        // TODO - does it make sense to use _id - a user could spoof someone else's _id with a valid token
        var conditions = (paramsToSave._id) ? { _id : paramsToSave._id } : { serviceUserId : paramsToSave.serviceUserId };
        paramsToSave.updated = new Date();
        return User.findOneAndUpdate(conditions, _.omit(paramsToSave,'_id'), { upsert : true }).exec();
        // same as Q.nfcall(User.update,...) with context binding
        // https://github.com/kriskowal/q#adapting-node
        // return Q.ninvoke(User, 'update', conditions, paramsToSave, { upsert : true });
      })
      .fail(function(error) {
        res.send(401);
        req.log.warn(error);
        return next(error);
      }).done(function(user) {
        if(user) {
          req.log.info('Created/Updated User _id:' + user._id );
          res.send({ _id: user._id, serviceUserId: user.serviceUserId });
        }
        return next();
      })

}
