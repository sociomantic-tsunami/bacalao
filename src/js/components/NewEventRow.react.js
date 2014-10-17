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

  getInitialState: function() {
    return {
      time: moment().add(1,'hours').startOf('hour').format('HH:mm'),
      venue: '',
      maxAttendees: ''
    };
  },


  render: function() {

    return (
      <tr>
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
            <Button bsSize="medium" bsStyle="info" onClick={this._create}>Create</Button>
          </td>
      </tr>
    );
  },

  _onTimeChange: function(e) {
    console.log(e.target.value);
    this.setState({ time: e.target.value });
  },

  _onVenueChange: function(e) {
    this.setState({ venue: e.target.value });
  },

  _onMaxAttendeesChange: function(e) {
    this.setState({ maxAttendees: e.target.value });
  },

  _create: function() {
    NewEventRowActionCreators.createEvent(_.clone(this.state));
    this.replaceState(this.getInitialState());
  }

});

module.exports = NewEventRow;
