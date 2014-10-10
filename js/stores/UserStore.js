var AppDispatcher = require('../dispatcher/AppDispatcher');
var SocialLoginUtils = require('../utils/SocialLoginUtils');
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

  getUser: function() {
    return _user;
  }

});


UserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case "LOGGED_IN_FB":
      _user.loggedIn = true;
      _.extend(_user, action.user);
      UserStore.emitChange();
      break;


    // case "TEST":
    //   if(_nodes[action.key]) {
    //     _nodes[action.key].attendees.filter(function(el) {
    //       return el !== action.attendee;
    //     });
    //     UserStore.emitChange();
    //   }
    //   break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
