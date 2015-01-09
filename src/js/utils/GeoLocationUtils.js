var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var UserAPIUtils = require('./UserAPIUtils');

var _hasGeolocation = navigator && navigator.geolocation;

var GeoLocationUtils = {



  init: function() {
    this.getLocation(function(position) {
      // sanitize the geoposition object
      var location = {
        latitude:   position.coords.latitude,
        longitude:  position.coords.longitude
      };

      AppDispatcher.handleInitAction({
        type: ActionTypes.GOT_LOCATION,
        position: location
      });

      UserAPIUtils.updateUserLocation(location);
    });
  },

  getLocation: function(success, error) {
    if(_hasGeolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      // TODO - dispatch an action here to notify the user
      console.error('no geo location support');
    }
  }

};

module.exports = GeoLocationUtils;
