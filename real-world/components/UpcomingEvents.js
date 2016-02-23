var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
// var EventsStore = require('../stores/EventsStore');
var UpcomingEvent = require('./UpcomingEvent.react.jsx');
// var UpcomingStore = require('../stores/UpcomingStore');

require('../../sass/upcoming_events.scss');


const getUpcomingEvent = function(eventId) {
  var event = EventsStore.getById(eventId);
  if(!event) {
    return;
  }
  return (<UpcomingEvent
            key={event._id || event.cid}
            upcomingEvent={event}
          />);
};

// var UpcomingEvents = React.createClass({
export default const UpcomingEvents = (props) => {
    var upcomingEvents = _.map(this.props.upcomingEvents, getUpcomingEvent);

    return (
      <div className="upcoming-events">
        <h4>Upcoming</h4>
          {upcomingEvents.map(event =>
            <UpcomingEvent
              key={event.id}
              {...event}
              onClick={() => onTodoClick(todo.id)}
            />
          )}
      </div>
    );
  }
});

