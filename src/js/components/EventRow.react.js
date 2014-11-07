/** @jsx React.DOM */

var EventActionCreators = require('../actions/EventActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Tooltip = require('react-bootstrap').Tooltip;
var Badge = require('react-bootstrap').Badge;
var JoinLeaveButton = require('./JoinLeaveButton.react');
var Glyphicon = require('react-bootstrap').Glyphicon;
var moment = require('moment')
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
require('../../sass/event.scss');

var getAttendee = function(attendee) {
  return <img key={attendee._id} className="event__box--atendees-avatar" src={attendee.picture} />
}



var EventRow = React.createClass({

  propTypes: {
    key: ReactPropTypes.string,
    maxAttendees: ReactPropTypes.number.isRequired,
    user: ReactPropTypes.object.isRequired,
    time: ReactPropTypes.object.isRequired,
    details: ReactPropTypes.string.isRequired,
    venue: ReactPropTypes.string.isRequired,
    creator: ReactPropTypes.object.isRequired,
    attendees: ReactPropTypes.array.isRequired
  },

  render: function() {
    // var attendees = _.chain(this.props.attendees)
    //  .reduce(function(memo, user) { return memo + ", " + user.firstName}, '')
    //  .value();

    var attendees = _.map(this.props.attendees, getAttendee);




    var maxAttendees = <Badge></Badge>;

    return (
        <div className="event__box">
            <h3 className="event__box--title">
              <Glyphicon className="event__box__icon" glyph="cutlery" />
              <span className="event__box--venue">{this.props.venue}</span>
            </h3>
            <div className="event__box--map">

            </div>
            <div className="event__box--time">
              <Glyphicon className="event__box__icon" glyph="calendar" />
              {this.getTime()}
            </div>
            <div className="event__box--organizer">
              <Glyphicon className="event__box__icon" glyph="user" />
              {this.getOrganizer(this.props.creator)}</div>

            <div className="event__box--details">
              <Glyphicon className="event__box__icon" glyph="info-sign" />
              {this.props.details}
            </div>
            <div className="event__box--atendees">
              <Glyphicon className="event__box__icon" glyph="thumbs-up" />
                <Badge>
                  {this.props.attendees.length}
                  {this.props.maxAttendees > 0 ? '/' : '' }{this.props.maxAttendees}
                  {maxAttendees}
                </Badge>
                <div className="event__box--atendee-pictures">
                {attendees}
                </div>
            </div>
            <div className="event__box--buttons">
              <JoinLeaveButton
                 user={this.props.user}
                 maxAttendees={this.props.maxAttendees}
                 attendees={this.props.attendees}
                 _onUserJoin={this._onUserJoin}
                 _onUserLeave={this._onUserLeave}
              />
            </div>
          </div>
    );
  },


  getTime: function() {
    var time = moment(this.props.time).fromNow();
    return time;
  },


  getOrganizer : function(user) {
    return [user.firstName, user.lastName].join(' ');
  },

  hasUserJoined : function() {
    if(this.props.user.loggedIn === false) {
      return false;
    }

    for (var i = this.props.attendees.length - 1; i >= 0; i--) {
      if(this.props.attendees[i]._id == this.props.user._id) {
        return true;
      }
    };
    return false;
  },

  _onUserJoin: function(event) {
    if(!this.props.key) {
      console.error('cant join before its saved on the server')
      return;
    }
    EventActionCreators.joinEvent(this.props.key);
  },

  _onUserLeave: function(event) {
    if(!this.props.key) {
      console.error('cant leave before its saved on the server')
      return;
    }
    EventActionCreators.leaveEvent(this.props.key);
  },
});

module.exports = EventRow;
