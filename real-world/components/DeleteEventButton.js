import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

export default class DeleteEventButton extends Component {
  render() {
      return (this.isVisible()
        ? <Button bsSize="small" onClick={this.props._onEventDeleted}>Delete</Button>
        : null)
  }

  // show the button if the user logged in is the creator of the event
  // and if he's the only one attending
  isVisible() {
    if( this.props.user._id == this.props.creator._id) {
      return (this.props.attendees.length === 0 ||
             (this.props.attendees.length === 1 &&
              this.props.attendees[0]._id === this.props.creator._id) )
    }

    return false
  }
}

DeleteEventButton.propTypes: {
    user: PropTypes.object.isRequired,
    creator: PropTypes.object.isRequired,
    attendees: PropTypes.array.isRequired,
    _onEventDeleted: PropTypes.func.isRequired
}
