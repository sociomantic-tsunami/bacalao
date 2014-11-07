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

  getFirstForSaving: function() {
    var lastAdded = _.clone(_nodes[0]);
    if(lastAdded._id) {
      console.error('The event is already saved');
      return;
    }
    lastAdded.attendees[0] = lastAdded.attendees[0]._id
    lastAdded.creator = lastAdded.creator._id
    return lastAdded;
  },

  removeAttendeeFromEvent: function(eventId, userId) {

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

      if(!action.event.cid) {
        // first case: the event was created by a different client and is added
        // as a new event
        _nodes.unshift(action.event);
        OutlineStore.emitChange();
        return;
      }

      // second case: this client created the event
      for (var i = _nodes.length - 1; i >= 0; i--) {
        // add server information based on the cid
        if(_nodes[i].cid === action.event.cid) {
          _.defaults(_nodes[i], action.event);
          OutlineStore.emitChange();
          return;
        }
      };


      break;

    case ActionTypes.CREATE_EVENT:
        _nodes.unshift({
          cid: _.uniqueId('event_' + Date.now() + '_'),
          time: moment(action.time, 'HH:mm').toDate(),
          venue: action.venue,
          details: action.details,
          maxAttendees: action.maxAttendees,
          creator : UserStore.getBasicUser(),
          attendees : [UserStore.getBasicUser()]
        })
        console.log(_nodes[0]);
        OutlineStore.emitChange();
      break;

    case ActionTypes.JOIN_EVENT:
        for (var i = _nodes.length - 1; i >= 0; i--) {
          if(_nodes[i]._id === action.eventId) {
            _nodes[i].attendees.push(UserStore.getBasicUser());
            break;
          }
        };
        OutlineStore.emitChange();
      break;

    // from the server
    // action.event = { eventId: ..., user: {...} }
    // add the user to the attendees if he's not already there
    case ActionTypes.JOINED_EVENT:
        for (var i = _nodes.length - 1; i >= 0; i--) {
          if(_nodes[i]._id === action.event.eventId) {
            if(! _.some(_nodes[i].attendees, function(attendee) { return attendee._id == action.event.user._id })) {
              _nodes[i].attendees.push(action.event.user);
            }
            break;
          }
        };
        OutlineStore.emitChange();
      break;

    case ActionTypes.LEAVE_EVENT:
        for (var i = _nodes.length - 1; i >= 0; i--) {
          if(_nodes[i]._id === action.eventId) {
            for (var k = _nodes[i].attendees.length - 1; k >= 0; k--) {
              if(_nodes[i].attendees[k]._id === UserStore.getUserId()) {
                _nodes[i].attendees.splice(k, 1);
                OutlineStore.emitChange();
                return;
              }
            };
          }
        };
      break;

    // from the server
    // action.event = { eventId: ..., userId: ... }
    // add the user to the attendees if he's not already there
    case ActionTypes.LEFT_EVENT:
        for (var i = _nodes.length - 1; i >= 0; i--) {
          if(_nodes[i]._id === action.event.eventId) {
            for (var k = _nodes[i].attendees.length - 1; k >= 0; k--) {
              if(_nodes[i].attendees[k]._id === action.event.userId) {
                _nodes[i].attendees.splice(k, 1);
                OutlineStore.emitChange();
                return
              }
            };
            break;
          }
        };
      break;

    default:
      // do nothing
  }

});

module.exports = OutlineStore;
