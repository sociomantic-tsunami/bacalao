var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Button = require('react-bootstrap').Button;

var JoinLeaveButton = React.createClass({

  propTypes: {
    user: ReactPropTypes.object,
    maxAttendees: ReactPropTypes.number.isRequired,
    attendees: ReactPropTypes.array.isRequired,
    isUpcoming: React.PropTypes.bool,
    _onUserLeave: ReactPropTypes.func.isRequired,
    _onUserJoin: ReactPropTypes.func
  },

  render: function() {
    this.props.isAttending = this.isAttending();

    if(this.props.isAttending) {
      return <Button disabled={this.isDisabled()} bsSize="small" bsStyle="danger" onClick={this.props._onUserLeave}>Leave</Button>;
    } else {
      return <Button disabled={this.isDisabled()} bsSize="small" bsStyle="info" onClick={this.props._onUserJoin}>Join</Button>;
    }
  },


  isAttending : function() {
    if(this.props.isUpcoming) {
      return true;
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
    if(this.props.attendees.length >= this.props.maxAttendees &&
      !this.props.isAttending) {
      return true;
    }

    return false;

  }

});

module.exports = JoinLeaveButton;
