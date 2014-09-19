var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _nodes = [];

var OutlineStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _nodes[id];
  },

  getAll: function() {
    return _nodes;
  }

});


OutlineStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case "RECEIVE_RAW_NODES":
      _nodes = action.rawNodes;
      OutlineStore.emitChange();
      break;

    case "CREATE_LUNCH":
        _nodes[Date.now()] = {
          time : action.time,
          place : action.place,
          creator : action.creator,
          attendees : [action.creator]
        }
        OutlineStore.emitChange();
      break;

    case "JOIN_LUNCH":
      if(_nodes[action.key]) {
        _nodes[action.key].attendees.push(action.attendee);
        OutlineStore.emitChange();
      }
      break;

    case "LEAVE_LUNCH":
      if(_nodes[action.key]) {
        _nodes[action.key].attendees.filter(function(el) {
          return el !== action.attendee;
        });
        OutlineStore.emitChange();
      }
      break;

    default:
      // do nothing
  }

});

module.exports = OutlineStore;
