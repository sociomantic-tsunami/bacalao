var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;

require('../../sass/add_event.scss');

var AddEventButton = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool.isRequired
  },

  render: function() {
    return (
      <ButtonLink
        to="new-event"
        disabled={!this.props.isLoggedIn}
        className="add-event__button"
        >
      </ButtonLink>
    );
  }

});

module.exports = AddEventButton;
