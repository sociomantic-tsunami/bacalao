/** @jsx React.DOM */

var EventActionCreators = require('../actions/EventActionCreators');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Tooltip = require('react-bootstrap').Tooltip;
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var moment = require('moment')
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;



var EventRow = React.createClass({

  propTypes: {
    key: ReactPropTypes.string,
    maxAttendees: ReactPropTypes.number.isRequired,
    user: ReactPropTypes.object.isRequired,
    time: ReactPropTypes.object.isRequired,
    venue: ReactPropTypes.string.isRequired,
    creator: ReactPropTypes.object.isRequired,
    attendees: ReactPropTypes.array.isRequired
  },

  render: function() {
    var attendees = _.chain(this.props.attendees)
     .reduce(function(memo, user) { return memo + ", " + user.firstName}, '')
     .value();

    //TODO abstract the join/leave buttons to their own components(reusable with some props)
    var button = this.hasUserJoined() ?
      <Button disabled={!this.props.user.loggedIn} bsSize="small" bsStyle="danger" onClick={this._onUserLeave}>Leave</Button> :
      <Button disabled={!this.props.user.loggedIn} bsSize="small" bsStyle="info" onClick={this._onUserJoin}>Join</Button>;


    var maxAttendees = <Badge></Badge>;

    return (
      <tr>
          <td>{this.getTime()}</td>
          <td>{this.props.venue}</td>
          <td>
          <OverlayTrigger placement="left" overlay={<Tooltip>{attendees}</Tooltip>}>
            <Badge>
            {this.props.attendees.length}
            {this.props.maxAttendees > 0 ? '/' : '' }{this.props.maxAttendees}</Badge>
          </OverlayTrigger>
          {maxAttendees}
          </td>
          <td>{this.getOrganizer(this.props.creator)}</td>
          <td>{button}</td>

      </tr>
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
