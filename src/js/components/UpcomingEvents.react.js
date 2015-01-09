/** @jsx React.DOM */
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var EventsStore = require('../stores/EventsStore');
var UpcomingEvent = require('./UpcomingEvent.react');
// var JoinLeaveButton = require('./JoinLeaveButton.react');

var getUpcomingEvent = function(eventId) {
  return <UpcomingEvent
            upcomingEvent={EventsStore.getById(eventId)}
          />
}

var UpcomingEvents = React.createClass({

    propTypes: {
        upcomingEvents : ReactPropTypes.array.isRequired
    },

    render: function () {
        var upcomingEvents = _.map(this.props.upcomingEvents, getUpcomingEvent);

        return (
            <div className="upcoming_events__spread">
              <h4>Upcoming Events</h4>
              <div className="upcoming_events_columns">
                {upcomingEvents}
              </div>
            </div>
        );
    }
});

module.exports = UpcomingEvents;
