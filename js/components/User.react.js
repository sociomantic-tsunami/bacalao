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
    return <button onClick={this._onClick}>FB Login</button>
  },

  _onClick: function() {
    UserActionCreators.loginFB();
  }

});

module.exports = User;
