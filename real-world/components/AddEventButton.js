import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
// var ReactRouterBootstrap = require('react-router-bootstrap');
// var ButtonLink = ReactRouterBootstrap.ButtonLink;
// import '../../sass/add_event.scss'; //TODO: SASS

export default class AddEventButton extends Component {
  render: function() {
    var tooltip = <Tooltip>Create a new event</Tooltip>;

    return (
      <OverlayTrigger placement='right' overlay={tooltip} delayHide={150}>
        <Button
          to="new-event"
          disabled={!this.props.isLoggedIn}
          className="add-event__button"
          >
        </Button>
      </OverlayTrigger>
    )
  }

}

AddEventButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}