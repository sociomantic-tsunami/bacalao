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
  return <img key={attendee._id || _.uniqueId('attendee-')} className="event__box--atendees-avatar" src={attendee.picture} />
}



var EventRow = React.createClass({

  propTypes: {
    key: ReactPropTypes.string,
    maxAttendees: ReactPropTypes.number.isRequired,
    user: ReactPropTypes.object.isRequired,
    time: ReactPropTypes.object.isRequired,
    details: ReactPropTypes.string.isRequired,
    venue: ReactPropTypes.object.isRequired,
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
          <div className="event__box--buttons">
            <JoinLeaveButton
               key={this.props.key}
               user={this.props.user}
               maxAttendees={this.props.maxAttendees}
               attendees={this.props.attendees}
               _onUserJoin={this._onUserJoin}
               _onUserLeave={this._onUserLeave}
            />
          </div>



          <div className="event__box--details">
          <img src={this.props.creator.picture} className="event__box--creator-avatar" />
            <div className="event__box--details__text">
                <h3 className="event__box--title">
                  <span className="event__box--venue">{this.props.venue.name}</span>
                </h3>
                <div className="event__box--time">
                  {this.getTime()}
                </div>
                <div className="event__box--details">
                  {this.props.details}
                </div>
            </div>
          </div>




          <div className="event__box--atendees">
              <span className="">Coming&nbsp;

              {this.props.attendees.length}
              {this.props.maxAttendees > 0 ? '/' : '' }{this.props.maxAttendees}
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
