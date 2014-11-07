/** @jsx React.DOM */


var React = require('react'),
    Row = require('./EventRow.react'),
    NewEventRow = require('./NewEventRow.react'),
    _ = require('underscore'),
    ReactPropTypes = React.PropTypes;

require('../../sass/outline.scss');


var getRow = function(user, node) {
  return <Row
            key={node._id}
            user={user}
            time={node.time}
            details={node.details}
            venue={node.venue}
            creator={node.creator}
            attendees={node.attendees}
            maxAttendees={node.maxAttendees}
          />
}


var Outline = React.createClass({

  propTypes: {
   events: ReactPropTypes.array.isRequired,
   user: ReactPropTypes.object.isRequired
  },

  render: function() {
    var rows = _.map(this.props.events, _.partial(getRow, this.props.user));

    return (
      <div className="events__spread">
        <div className="events__columns">
            {rows}
        </div>
      </div>
    );

  }

});

module.exports = Outline;
