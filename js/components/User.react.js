/** @jsx React.DOM */

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var UserActionCreators = require('../actions/UserActionCreators');
var UserLogin = require('./UserLogin.react');

var ENTER_KEY_CODE = 13;

var User = React.createClass({

  propTypes: {
    user: ReactPropTypes.object.isRequired
  },

  render: function() {
    if(this.props.user.loggedIn) {
      return (
        <span>Logged in as {this.props.user.username}</span>
      );
    } else {
      return (
        <UserLogin
          onLogin={this._onLogin}
        />
      );
    }
  },

  _onLogin: function(username) {
    if(username && username.length && username.length > 0) {
      UserActionCreators.login(username);
    } else {
      console.error('invalid username');
    }
  }


});

module.exports = User;
