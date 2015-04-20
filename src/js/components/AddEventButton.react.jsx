var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;
var ReactBootstrap = require('react-bootstrap');
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;

require('../../sass/add_event.scss');

var AddEventButton = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool.isRequired
  },

  render: function() {
    var tooltip = <Tooltip>Create a new event</Tooltip>;


    return (
      <OverlayTrigger placement='right' overlay={tooltip} delayHide={150}>
        <ButtonLink
          to="new-event"
          disabled={!this.props.isLoggedIn}
          className="add-event__button"
          >
        </ButtonLink>
      </OverlayTrigger>
    );
  }

});

module.exports = AddEventButton;
