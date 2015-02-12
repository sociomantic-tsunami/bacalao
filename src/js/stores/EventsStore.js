var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var UserStore = require('./UserStore');
var _ = require('underscore');
var Asorted = require('asorted');
var moment = require('moment');

var _nodes = new Asorted({ sortBy: 'time' });
var lastAddedIndex = -1;

var EventsStore = _.extend({}, EventEmitter.prototype, {

  /**
   * Get the event object by _id
   *
   * Method searches the array for matching event.
   *
   * @param   string  eventId   the event _id
   * @return  mixed   event object or undefined if not found
   */
  getById: function(eventId) {
    return _.findWhere(_nodes.array, { _id : eventId });
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _nodes.array;
  },

  getLastCreatedForAPI: function() {
    if(lastAddedIndex === -1) {
      console.error('No element found');
      return;
    }
    var lastAdded = _.clone(_nodes.array[lastAddedIndex]);
    if(lastAdded._id) {
      console.error('The event is already saved');
      return;
    }
    lastAdded.attendees[0] = lastAdded.attendees[0]._id;
    lastAdded.creator = lastAdded.creator._id;
    return lastAdded;
  }

});


EventsStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var i,k;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_EVENTS:
      var toAdd = _.map(action.rawEvents, function(node) {
        node.time = new Date(node.time);
        return node;
      });
      // _nodes.insert.apply(_nodes, toAdd);
      _.each(toAdd, _nodes.insert, _nodes);
      EventsStore.emitChange();
      break;

    case ActionTypes.CREATED_EVENT:
      if(!action.event.cid) {
        // first case: the event was created by a different client and is added
        // as a new event
        action.event.time = new Date(action.event.time);
        if(_nodes.array[lastAddedIndex] && action.event._id === _nodes.array[lastAddedIndex]._id) {
          // if this client created the event, got the response with _id
          // and got an extra socket notification
          return;
        }
        _nodes.insert(action.event);
        EventsStore.emitChange();
        return;
      }

      // second case: this client created the event
      for (i = _nodes.array.length - 1; i >= 0; i--) {
        // add server information based on the cid
        if(_nodes.array[i].cid === action.event.cid) {
          _.extend(_nodes.array[i], _.omit(action.event, 'time'));
          EventsStore.emitChange();
          return;
        }
      }


      break;

    case ActionTypes.CREATE_EVENT:
        lastAddedIndex = _nodes.insert({
          cid: _.uniqueId('event_' + Date.now() + '_'),
          time: moment(action.event.time, 'HH:mm').toDate(),
          venue: action.event.venue,
          details: action.event.details,
          maxAttendees: action.event.maxAttendees || 0,
          creator : UserStore.getBasicUser(),
          attendees : [UserStore.getBasicUser()]
        });
        EventsStore.emitChange();
      break;

    case ActionTypes.JOIN_EVENT:
        for (i = _nodes.array.length - 1; i >= 0; i--) {
          if(_nodes.array[i]._id === action.eventId) {
            _nodes.array[i].attendees.push(UserStore.getBasicUser());
            break;
          }
        }
        EventsStore.emitChange();
      break;

    // from the server
    // action.event = { eventId: ..., user: {...} }
    // add the user to the attendees if he's not already there
    case ActionTypes.JOINED_EVENT:
        for (i = _nodes.array.length - 1; i >= 0; i--) {
          if(_nodes.array[i]._id === action.event.eventId) {
            if(! _.some(_nodes.array[i].attendees, function(attendee) { return attendee._id == action.event.user._id })) {
              _nodes.array[i].attendees.push(action.event.user);
            }
            break;
          }
        }
        EventsStore.emitChange();
      break;

    case ActionTypes.LEAVE_EVENT:
        for (i = _nodes.array.length - 1; i >= 0; i--) {
          if(_nodes.array[i]._id === action.eventId) {
            for (k = _nodes.array[i].attendees.length - 1; k >= 0; k--) {
              if(_nodes.array[i].attendees[k]._id === UserStore.getUserId()) {
                _nodes.array[i].attendees.splice(k, 1);
                EventsStore.emitChange();
                return;
              }
            }
          }
        }
      break;

    // from the server
    // action.event = { eventId: ..., userId: ... }
    // add the user to the attendees if he's not already there
    case ActionTypes.LEFT_EVENT:
        for (i = _nodes.array.length - 1; i >= 0; i--) {
          if(_nodes.array[i]._id === action.event.eventId) {
            for (k = _nodes.array[i].attendees.length - 1; k >= 0; k--) {
              if(_nodes.array[i].attendees[k]._id === action.event.userId) {
                _nodes.array[i].attendees.splice(k, 1);
                EventsStore.emitChange();
                return;
              }
            }
            break;
          }
        }
      break;

    // from the server
    // action.event = { eventId: ... }
    // remove the event
    case ActionTypes.DELETED_EVENT:
      _nodes.remove(action.event);
        EventsStore.emitChange();
        return;
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;
