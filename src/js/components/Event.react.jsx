var EventActionCreators = require('../actions/EventActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Tooltip = require('react-bootstrap').Tooltip;
var Badge = require('react-bootstrap').Badge;
var JoinLeaveButton = require('./JoinLeaveButton.react.jsx');
var DeleteEventButton = require('./DeleteEventButton.react.jsx');
var Glyphicon = require('react-bootstrap').Glyphicon;
var moment = require('moment');

require('../../sass/event.scss');


var getAttendee = function(attendee) {
  return <img
    key={attendee._id || _.uniqueId('attendee-')}
    className="event__box--atendees-avatar"
    src={attendee.picture} />
}

var EventRow = React.createClass({

  propTypes: {
    key: ReactPropTypes.string,
    user: ReactPropTypes.object.isRequired,
    event: React.PropTypes.shape({
      maxAttendees: ReactPropTypes.number.isRequired,
      time: ReactPropTypes.object.isRequired,
      details: ReactPropTypes.string.isRequired,
      venue: ReactPropTypes.object.isRequired,
      creator: ReactPropTypes.object.isRequired,
      attendees: ReactPropTypes.array.isRequired
    })
  },

  render: function() {

    var attendees = _.map(this.props.event.attendees, getAttendee);

    var maxAttendees = <Badge></Badge>;

    return (
        <div className="event__box">
          <div className="event__box--buttons">
            <JoinLeaveButton
               user={this.props.user}
               maxAttendees={this.props.event.maxAttendees}
               attendees={this.props.event.attendees}
               _onUserJoin={this._onUserJoin}
               _onUserLeave={this._onUserLeave}
            />
          </div>

          <div className="event__box--buttons">
            <DeleteEventButton
               user={this.props.user}
               creator={this.props.event.creator}
               attendees={this.props.event.attendees}
               _onEventDeleted={this._onEventDeleted}
            />
          </div>



          <div className="event__box--details">
          <img src={this.props.event.creator.picture} className="event__box--creator-avatar" />
            <div className="event__box--details__text">
                <div className="event__box--venue">
                  <h3 className="event__box--venue-name">
                    <a target="_blank" href={this.props.event.venue.url}>{this.props.event.venue.name}</a>
                  </h3>
                  <span className="event__box--venue-address">
                    {this.props.event.venue.formatted_address}
                  </span>
                  <span className="event__box--venue-phone-number">
                    {this.props.event.venue.international_phone_number}
                  </span>
                </div>
                <div className="event__box--time">
                  {this.getTime()}
                </div>
                <div className="event__box--details">
                  {this.props.event.details}
                </div>
            </div>
          </div>




          <div className="event__box--atendees">
              <span className="">Coming&nbsp;

              {this.props.event.attendees.length}
              {this.props.event.maxAttendees > 0 ? '/' : '' }{this.props.event.maxAttendees}
              {maxAttendees}

              </span>
              <p>

              </p>
              <div className="event__box--atendee-pictures">
              {attendees}
              </div>
          </div>
        </div>
    );
  },


  getTime: function() {
    var time = moment(this.props.event.time).fromNow();
    return time;
  },


  getOrganizer : function(user) {
    return [user.firstName, user.lastName].join(' ');
  },

  hasUserJoined : function() {
    if(this.props.user.loggedIn === false) {
      return false;
    }

    for (var i = this.props.event.attendees.length - 1; i >= 0; i--) {
      if(this.props.event.attendees[i]._id == this.props.user._id) {
        return true;
      }
    };
    return false;
  },

  _onUserJoin: function(event) {
    if(!this.props.event._id) {
      console.error('cant join before its saved on the server')
      return;
    }
    EventActionCreators.joinEvent(this.props.event._id);
  },

  _onUserLeave: function(event) {
    if(!this.props.event._id) {
      console.error('cant leave before its saved on the server')
      return;
    }
    EventActionCreators.leaveEvent(this.props.event._id);
  },

  _onEventDeleted: function(event) {
    if(!this.props.event._id) {
      console.error('cant delete before its saved on the server')
      return;
    }
    EventActionCreators.deleteEvent(this.props.event._id);
  }
});

module.exports = EventRow;
