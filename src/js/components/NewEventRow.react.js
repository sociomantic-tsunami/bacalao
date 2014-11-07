/** @jsx React.DOM */

var NewEventRowActionCreators = require('../actions/NewEventRowActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var moment = require('moment')
require('../../sass/new_event_form.scss');



var NewEventRow = React.createClass({


  propTypes: {
   isLoggedIn: ReactPropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      time: moment().add(1,'hours').startOf('hour').format('HH:mm'),
      details: '',
      venue: '',
      maxAttendees: null
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
      <div className="new-event">
            <Input
              type="time"
              label="Time"
              value={this.state.time}
              onChange={this._onTimeChange} />
            <Input
              type="text"
              label="Venue"
              value={this.state.venue}
              onChange={this._onVenueChange} />
            <Input
              type="number"
              label="Max Attendees"
              value={this.state.maxAttendees}
              onChange={this._onMaxAttendeesChange} />
            <Input
              type="textarea"
              label="Details"
              value={this.state.details}
              onChange={this._onDetailsChange} />
            <Button bsSize="medium" bsStyle="info" className={createButtonClasses} onClick={this._create}>Create</Button>
      </div>
    );
  },

  _onTimeChange: function(e) {
    this.setState({ time: e.target.value });
  },

  _onVenueChange: function(e) {
    this.setState({ venue: e.target.value });
  },

  _onDetailsChange: function(e) {
    this.setState({ details: e.target.value });
  },

  _onMaxAttendeesChange: function(e) {
    if ( e.target.value === 1 ) {
      this.setState({ maxAttendees: 2 });
    } else if ( e.target.value % 1 === 0 ) {
      this.setState({ maxAttendees: parseInt(e.target.value, 10) });
    } else {
      this.setState({ maxAttendees: Math.floor(e.target.value)});
    }
  },

  _create: function() {
    NewEventRowActionCreators.createEvent(_.clone(this.state));
    this.replaceState(this.getInitialState());
  }

});

module.exports = NewEventRow;
