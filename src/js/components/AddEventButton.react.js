var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Button = require('react-bootstrap').Button;

var ReactRouterBootstrap = require('react-router-bootstrap');
// var NavItemLink = ReactRouterBootstrap.NavItemLink;
var ButtonLink = ReactRouterBootstrap.ButtonLink;

require('../../sass/AddEventButton.scss');

var AddEventButton = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool.isRequired
  },

  render: function() {
    return (
      <ButtonLink
        to="new-event"
        disabled={!this.props.isLoggedIn}
        className="add-event-button"
        bsSize="large"
        bsStyle="success">
          +
      </ButtonLink>
    );
  }

});

module.exports = AddEventButton;
