var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Event = require('./Event.react.jsx');
var AddEventButton = require('./AddEventButton.react.jsx');
var UpcomingEvents = require('./UpcomingEvents.react.jsx');

require('../../sass/outline.scss');


var getEvent = function(user, event) {
  return <Event
            key={event._id || event.cid}
            user={user}
            event={event}
          />
}


var Events = React.createClass({

  propTypes: {
   events: ReactPropTypes.array.isRequired,
   user: ReactPropTypes.object.isRequired
  },

  render: function() {
    var events = _.map(this.props.events, _.partial(getEvent, this.props.user));

    return (
      <div className="events__spread">
        <h4>Events</h4>
        <div className="events__columns">
            {events}
        </div>
        <UpcomingEvents
          upcomingEvents={this.props.upcomingEvents}
        />
        <AddEventButton
          onClick={this.onAddEvent}
          isLoggedIn={this.props.user.loggedIn} />
      </div>
    );

  }

});

module.exports = Events;
