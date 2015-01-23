var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Button = require('react-bootstrap').Button;

var JoinLeaveButton = React.createClass({

  propTypes: {
    user: ReactPropTypes.object.isRequired,
    maxAttendees: ReactPropTypes.number.isRequired,
    attendees: ReactPropTypes.array.isRequired,
    isUpcoming: React.PropTypes.bool,
    _onUserLeave: ReactPropTypes.func.isRequired,
    _onUserJoin: ReactPropTypes.func.isRequired
  },

  render: function() {
    this.props.hasUserJoined = this.hasUserJoined();

    if(this.props.hasUserJoined) {
      return <Button disabled={this.isDisabled()} bsSize="small" bsStyle="danger" onClick={this.props._onUserLeave}>Leave</Button>;
    } else {
      return <Button disabled={this.isDisabled()} bsSize="small" bsStyle="info" onClick={this.props._onUserJoin}>Join</Button>;
    }
  },


  hasUserJoined : function() {
    if(this.props.isUpcoming)
      return true;

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

  // Disable the join/leave if the user is not logged in or if the maxAttendees has been reached
  isDisabled: function() {
    if(this.props.user && !this.props.user.loggedIn) {
      return true;
    }

    if(this.props.attendees.length >= this.props.maxAttendees &&
      !this.props.hasUserJoined) {
      return true;
    }

    return false;

  }

});

module.exports = JoinLeaveButton;
