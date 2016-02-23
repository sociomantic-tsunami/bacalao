import React, { Component, PropTypes } from 'react'
import * as _ from 'underscore'
import { Button } from 'react-bootstrap'

const isAttending = (props) => {
    if(props.isUpcoming) {
      return true
    }

    for (var i = this.props.attendees.length - 1; i >= 0; i--) {
      if(this.props.attendees[i]._id == this.props.user._id) {
        return true
      }
    }
    return false
}

  // Disable the join/leave if the user is not logged in or if the maxAttendees has been reached
isDisabled = (props) => {
    if(props.maxAttendees === 0) {
      return false
    }

    if(this.props.attendees.length >= this.props.maxAttendees &&
      !isAttending(props)) {
      return true
    }

    return false
}


export default const JoinLeaveButton = (props) => {
    if(isAttending(props)) {
      return <Button disabled={isDisabled(props)} bsSize="small" bsStyle="danger" onClick={props._onUserLeave}>Leave</Button>;
    } else {
      return <Button disabled={isDisabled(props)} bsSize="small" bsStyle="info" onClick={props._onUserJoin}>Join</Button>;
    }
}

JoinLeaveButton.propTypes = {
  user: ReactPropTypes.object,
  maxAttendees: ReactPropTypes.number.isRequired,
  attendees: ReactPropTypes.array.isRequired,
  isUpcoming: React.PropTypes.bool,
  _onUserLeave: ReactPropTypes.func.isRequired,
  _onUserJoin: ReactPropTypes.func
}