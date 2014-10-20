var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var UserStore = require('./UserStore');
var _ = require('underscore');
var moment = require('moment');

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

  getAll: function() {
    return _nodes;
  },

  getLastAdded: function() {
    return _nodes[_nodes.length -1];
  }

});


OutlineStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_RAW_EVENTS:
      _nodes = _.map(action.rawEvents, function(node) {
        node.time = new Date(node.time);
        return node;
      });
      OutlineStore.emitChange();
      break;

    case ActionTypes.CREATED_EVENT:
      for (var i = _nodes.length - 1; i >= 0; i--) {
        if(_nodes[i].cid === action.event.cid) {
          _.defaults(_nodes[i], action);
          break;
        }
      };
      OutlineStore.emitChange();
      break;

    case ActionTypes.CREATE_EVENT:
        _nodes.push({
          cid: _.uniqueId('event_'),
          time: moment(action.time, 'HH:mm').toDate(),
          venue: action.venue,
          maxAttendees: action.maxAttendees,
          creator : UserStore.getUserId(),
          attendees : [UserStore.getUserId()]
        })
        OutlineStore.emitChange();
      break;

    case ActionTypes.JOIN_LUNCH:
      // if(_nodes[action.key]) {
      //   _nodes[action.key].attendees.push(action.attendee);
      //   OutlineStore.emitChange();
      // }
      break;

    case ActionTypes.LEAVE_LUNCH:
      // if(_nodes[action.key]) {
      //   _nodes[action.key].attendees.filter(function(el) {
      //     return el !== action.attendee;
      //   });
        // OutlineStore.emitChange();
      // }
      break;

    default:
      // do nothing
  }

});

module.exports = OutlineStore;
