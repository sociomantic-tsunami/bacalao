var UserActionCreators = require('../actions/UserActionCreators');
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Button = require('react-bootstrap').Button;

var ENTER_KEY_CODE = 13;

var UserLogin = React.createClass({

  propTypes: {
    onLogin: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {

    return (
      <div>
        <input
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.value}
            autoFocus={true}
          />
          <Button bsStyle="primary" onClick={this._save}>
          Login
          </Button>
      </div>
    );
  },


  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onLogin(this.state.value);
    this.setState({
      value: ''
    });
  },


  /**
   * @param {object} event
   */
  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }


});

module.exports = UserLogin;
