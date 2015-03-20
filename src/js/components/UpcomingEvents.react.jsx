var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var EventsStore = require('../stores/EventsStore');
var UpcomingEvent = require('./UpcomingEvent.react.jsx');
var UpcomingStore = require('../stores/UpcomingStore');

require('../../sass/upcoming_events.scss');


var getUpcomingEvent = function(eventId) {
  var event = EventsStore.getById(eventId);
  if(!event) {
    return;
  }
  return (<UpcomingEvent
            key={event._id || event.cid}
            upcomingEvent={event}
          />);
};

var UpcomingEvents = React.createClass({

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    UpcomingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UpcomingStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this._getState())
  },

  _getState: function() {
    return {
      upcomingEvents: UpcomingStore.getUpcoming()
    }
  },

  render: function () {
    var upcomingEvents = _.map(this.state.upcomingEvents, getUpcomingEvent);

    return (
        <div className="upcoming-events">
          <h4>Upcoming</h4>
            {upcomingEvents}
        </div>
    );
  }
});

module.exports = UpcomingEvents;
