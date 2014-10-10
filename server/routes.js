var Models = require('./models/models'),
    _ = require('underscore'),
    Event = Models.Event;
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
    var fields = 'firstName lastName middleName gender email picture service serviceUserId accessToken tokenExpiration'.split(' ');
    var paramsToSave = _.pick(req.params, fields);
    var user = new User(paramsToSave);

    // res.send(user);
    // return next();
    // DEBUG END

    var query = User.findOne({ serviceUserId : paramsToSave.serviceUserId });


    // user.save(function (err, user) {
    //   if (err) return next(err);
    //   console.log(user)
    //   res.send(user);
    //   return next();
    // });

}
