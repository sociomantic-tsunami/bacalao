var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var _hasGeolocation = navigator && navigator.geolocation;

var GeoLocationUtils = {



  init: function() {
    this.getLocation(function(position) {
      AppDispatcher.handleInitAction({
        type: ActionTypes.GOT_LOCATION,
        position: position
      });
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
