var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var AddEventActionCreators = require('../actions/UserActionCreators');
var Button = require('react-bootstrap').Button;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var Routes = Constants.Routes;

require('../../sass/AddEventButton.scss');

var AddEventButton = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool.isRequired,
    onClick: ReactPropTypes.func
  },

  render: function() {
    return (
      <Button
        disabled={!this.props.isLoggedIn}
        className="add-event-button"
        bsSize="large"
        bsStyle="success"
        onClick={this.onClick}>
          +
      </Button>
    );
  },

  onClick: function() {
  }

});

module.exports = AddEventButton;
