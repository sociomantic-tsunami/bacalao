var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _user = {
  loggedIn : false,
};

var UserStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _user.loggedIn;
  },

  getToken: function() {
    return _user.accessToken || false;
  },


  getUser: function() {
    return _.clone(_user);
  },

  getUserId: function() {
    return _user._id || false;
  },

  getBasicUser: function() {
    return _.pick(_user, ['_id', 'firstName', 'lastName', 'picture']);
  }

});


UserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.INIT_USER:
      _.extend(_user, action.user);
      UserStore.emitChange();
      break;

    case ActionTypes.LOGGED_IN_FB:
      _.extend(_user, action.user);
      UserStore.emitChange();
      break;


    case ActionTypes.LOGGED_OUT_FB:
      _user = {
        loggedIn: false
      };
      localStorage.removeItem('user', JSON.stringify(_user));
      UserStore.emitChange();
      break;


    case ActionTypes.LOGGED_IN_API:
      _user.loggedIn = true;
      if(_user.serviceUserId === action.user.serviceUserId) {
        _user._id = action.user._id;
      }
      UserStore.emitChange();

      localStorage.setItem('user', JSON.stringify(_user));
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
