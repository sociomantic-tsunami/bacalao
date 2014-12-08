var React = require('react');
var Row = require('./EventRow.react');
var NewEventRow = require('./NewEventRow.react');
var _ = require('underscore');
var ReactPropTypes = React.PropTypes;

require('../../sass/outline.scss');


var getEvent = function(user, event) {
  return <Row
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
    var rows = _.map(this.props.events, _.partial(getEvent, this.props.user));

    return (
      <div className="events__spread">
        <div className="events__columns">
            {rows}
        </div>
      </div>
    );

  }

});

module.exports = Events;
