import React, { Component, PropTypes } from 'react'
import { Button, Input, Modal } from 'react-bootstrap'
import moment from 'moment'
import * as _ from 'underscore'
import { Link } from 'react-router'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

// require('../../sass/new_event_form.scss');
// require('../../sass/react_widgets.scss');


class NewEventForm extends Component {

  getInitialState() {
    return {
      time: moment().add(1,'hours').startOf('hour').toDate(),
      details: '',
      venueSearch: '',
      venue: {},
      maxAttendees: ''
    };
  }


  render() {
    var cx = React.addons.classSet;
    var createButtonClasses = cx({
      'disabled': !(this.state.venue && this.state.details && this.props.user.loggedIn)
    });


    return (
      <Modal title="New Event" onRequestHide={this._close}>
        <div className="new-event__box">
            <DateTimePicker
              defaultValue={this.state.time}
              onChange={this._onTimeChange}
            />
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
              type="textarea"
              label="Details"
              value={this.state.details}
              onChange={this._onDetailsChange} />
            <Button bsSize="medium" bsStyle="info"
            className={createButtonClasses} onClick={this._create}>
            Create</Button>
        </div>
      </Modal>
    );
  }


  _close(e) {
    this.transitionTo('dashboard');
  }


  _getVenueEl() {
    return this.getDOMNode().getElementsByClassName('js-venue-search')[0];
  }

  componentDidMount() {
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
  }


  componentWillUnmount() {
    this.autocomplete.unbindAll();
    google.maps.event.clearInstanceListeners(this._getVenueEl());

  }

  _onTimeChange(date) {
    this.setState({ time: date });
  }

  _onGoogleVenueChange() {
      var place = this.autocomplete.getPlace();

      // forbid places that don't exist on google maps
      if(!place.name) {
        return;
      }

      this.setState({ venue: place });
  }

  _onVenueSearchChange(e) {
    this.setState({ venueSearch: e.target.value });
    // stub function. Venue changes are handled by _onGoogleVenueChange
  }


  _onDetailsChange(e) {
    this.setState({ details: e.target.value });
  }

  _onMaxAttendeesChange(e) {
    if ( e.target.value % 1 === 0 ) {
      this.setState({ maxAttendees: parseInt(e.target.value, 10) });
    } else {
      this.setState({ maxAttendees: Math.floor(e.target.value)});
    }
  }

  _create() {
    // TODO EventActionCreators.createEvent(_.clone(this.state));
    // this.replaceState(this.getInitialState());
    this.props.onCreate && this.props.onCreate();
    this.transitionTo('dashboard');
  }

}


NewEventForm.propTypes = {
 user: PropTypes.object.isRequired,
 onCreate: PropTypes.func
};

module.exports = NewEventForm;
