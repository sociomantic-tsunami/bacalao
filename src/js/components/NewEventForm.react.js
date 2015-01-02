var EventActionCreators = require('../actions/EventActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Modal = require('react-bootstrap').Modal;
var moment = require('moment');
require('../../sass/new_event_form.scss');
var Navigation = require('react-router').Navigation;



var NewEventForm = React.createClass({

  mixins: [Navigation],

  propTypes: {
   user: ReactPropTypes.object.isRequired,
   onCreate: ReactPropTypes.func
  },

  getInitialState: function() {
    return {
      time: moment().add(1,'hours').startOf('hour').format('HH:mm'),
      details: '',
      venueSearch: '',
      venue: {},
      maxAttendees: ''
    };
  },


  render: function() {
    var cx = React.addons.classSet;
    var createButtonClasses = cx({
      'disabled': !(this.state.venue && this.state.details && this.props.user.loggedIn)
    });



    return (
      <Modal title="New Event" onRequestHide={this._close}>
            <Input
              type="time"
              label="Time"
              value={this.state.time}
              onChange={this._onTimeChange} />
            <Input
              className="js-venue-search new-event__box--venue"
              type="text"
              label="Venue"
              value={this.state.venue && this.state.venue.name ? this.state.venue.name : this.state.venueSearch}
              onChange={this._onVenueSearchChange}
              />
            <Input
              type="number"
              label="Max Attendees"
              value={this.state.maxAttendees}
              onChange={this._onMaxAttendeesChange} />
            <Input
              type="text"
              label="Details"
              value={this.state.details}
              onChange={this._onDetailsChange} />
            <Button bsSize="medium" bsStyle="info"
            className={createButtonClasses} onClick={this._create}>
            Create</Button>
      </Modal>
    );
  },


  _close: function(e) {
    this.transitionTo('dashboard');
  },


  _getVenueEl: function() {
    return this.getDOMNode().getElementsByClassName('js-venue-search')[0];
  },

  componentDidMount: function() {
    var venueEl = this._getVenueEl();
    var autocompleteOpts = {
      types: ['establishment']
    };

    this.autocomplete = new google.maps.places.Autocomplete(venueEl, autocompleteOpts);
    // set bounds to the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(_.bind(function(position) {
        var geolocation = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        this.autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
            geolocation));
      }, this));
    }

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(this.autocomplete, 'place_changed', this._onGoogleVenueChange);
  },


  componentWillUnmount: function() {
    this.autocomplete.unbindAll();
    google.maps.event.clearInstanceListeners(this._getVenueEl());

  },

  _onTimeChange: function(e) {
    this.setState({ time: e.target.value });
  },

  _onGoogleVenueChange: function() {
      var place = this.autocomplete.getPlace();

      // forbid places that don't exist on google maps
      if(!place.place_id) {
        return;
      }

      this.setState({ venue: place });
  },

  _onVenueSearchChange: function(e) {
    this.setState({ venueSearch: e.target.value });
    // stub function. Venue changes are handled by _onGoogleVenueChange
  },


  _onDetailsChange: function(e) {
    this.setState({ details: e.target.value });
  },

  _onMaxAttendeesChange: function(e) {
    if ( e.target.value % 1 === 0 ) {
      this.setState({ maxAttendees: parseInt(e.target.value, 10) });
    } else {
      this.setState({ maxAttendees: Math.floor(e.target.value)});
    }
  },

  _create: function() {
    EventActionCreators.createEvent(_.clone(this.state));
    this.replaceState(this.getInitialState());
    this.props.onCreate && this.props.onCreate();
    this.transitionTo('dashboard');
  }

});

module.exports = NewEventForm;
