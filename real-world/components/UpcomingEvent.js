var EventActionCreators = require('../actions/EventActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var JoinLeaveButton = require('./JoinLeaveButton.react.jsx');
var moment = require('moment');
var _ = require('underscore');


var UpcomingEvent = React.createClass({

  propTypes: {
      upcomingEvent : ReactPropTypes.shape({
        venue: ReactPropTypes.oneOfType([
          ReactPropTypes.string,
          ReactPropTypes.object
        ]),
        time: ReactPropTypes.object.isRequired,
        details: ReactPropTypes.string.isRequired
      })
  },


  render: function() {
    if(_.isObject(this.props.upcomingEvent.venue)) {
      return (
        <div className="upcoming-event">
          <div className="venue">
            <h3 className="venue-name">
              <a target="_blank" href={this.props.upcomingEvent.venue.url}>{this.props.upcomingEvent.venue.name}</a>
            </h3>
            <span className="venue-address">
              {this.props.upcomingEvent.venue.formatted_address}
            </span>
            <span className="venue-phone">
              {this.props.upcomingEvent.venue.international_phone_number}
            </span>
          </div>
          <div className="time">
            {this.getTime()}
          </div>
          <div className="time--from-now">
            {this.getTimeFromNow()}
          </div>
          <div className="button__container">
            <JoinLeaveButton
              isUpcoming={true}
              maxAttendees={this.props.upcomingEvent.maxAttendees}
              attendees={this.props.upcomingEvent.attendees}
              _onUserLeave={this._onUserLeave}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="upcoming-event">
          <div className="venue">
            <h3 className="venue-name">
              {this.props.upcomingEvent.venue.name}
            </h3>
          </div>
          <div className="time">
            {this.getTime()}
          </div>
          <div className="time--from-now">
            {this.getTimeFromNow()}
          </div>
          <div className="details">
            {this.props.upcomingEvent.details}
          </div>
        </div>
      );
    }
  },

  getTime: function() {
    var time = moment(this.props.upcomingEvent.time).format( 'h:mm' );
    return time;
  },

  getTimeFromNow: function() {
    var timeFromNow = moment(this.props.upcomingEvent.time).fromNow();
    return timeFromNow;
  },

  _onUserLeave: function(event) {
    // if(!this.props.upcomingEvent._id) {
    //   console.error('cant leave before its saved on the server')
    //   return;
    // }
    // EventActionCreators.leaveEvent(this.props.upcomingEvent._id);
  },

});

module.exports = UpcomingEvent;
