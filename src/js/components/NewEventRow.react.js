/** @jsx React.DOM */

var NewEventRowActionCreators = require('../actions/NewEventRowActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var moment = require('moment')



var NewEventRow = React.createClass({


  propTypes: {
   isLoggedIn: ReactPropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      time: moment().add(1,'hours').startOf('hour').format('HH:mm'),
      venue: '',
      maxAttendees: ''
    };
  },


  render: function() {
    var cx = React.addons.classSet;
    var trClasses = cx({
      'hidden': !this.props.isLoggedIn
    });

    var createButtonClasses = cx({
      'disabled': ! this.state.venue || ! this.state.maxAttendees
    });



    return (
      <tr className={trClasses}>
          <td>
            <Input
              type="time"
              label="Time"
              value={this.state.time}
              onChange={this._onTimeChange} />
          </td>
          <td>
            <Input
              type="text"
              label="Venue"
              value={this.state.venue}
              onChange={this._onVenueChange} />
          </td>
          <td>
            <Input
              type="number"
              label="Max Attendees"
              value={this.state.maxAttendees}
              onChange={this._onMaxAttendeesChange} />
          </td>
          <td></td>
          <td>
            <Button bsSize="medium" bsStyle="info" className={createButtonClasses} onClick={this._create}>Create</Button>
          </td>
      </tr>
    );
  },

  _onTimeChange: function(e) {
    this.setState({ time: e.target.value });
  },

  _onVenueChange: function(e) {
    this.setState({ venue: e.target.value });
  },

  _onMaxAttendeesChange: function(e) {
    if ( e.target.value % 1 === 0 )
    {
      this.setState({ maxAttendees: e.target.value });
    }
    else
    {
      this.setState({ maxAttendees: Math.floor(e.target.value)});
    }
  },

  _create: function() {
    NewEventRowActionCreators.createEvent(_.clone(this.state));
    this.replaceState(this.getInitialState());
  }

});

module.exports = NewEventRow;
