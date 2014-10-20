/** @jsx React.DOM */


var React = require('react'),
    Row = require('./EventRow.react'),
    NewEventRow = require('./NewEventRow.react'),
    _ = require('underscore'),
    ReactPropTypes = React.PropTypes;


var getRow = function(user, node) {
  return <Row
            key={node._id}
            user={user}
            time={node.time}
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
      <div className="row clearfix">
        <div className="panel panel-primary filterable">
            <div className="panel-heading">
                <h3 className="panel-title">Events</h3>
            </div>
            <table className="table">
                <thead>
                    <tr className="filters">
                        <th>Time</th>
                        <th>Venue</th>
                        <th>Attendees</th>
                        <th>Organizer</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {rows}
                  <NewEventRow></NewEventRow>
                </tbody>
            </table>
        </div>
      </div>
    );

  }

});

module.exports = Outline;
