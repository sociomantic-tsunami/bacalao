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
            <div>
                <span>Hello {this.props.user.firstName}</span>
                <button onClick={this._onLogout}>Logout</button>
            </div>
            );
    } else {
        return (<button onClick={this._onLogin}>FB Login</button>);
    }
  },

  _onLogin: function() {
    UserActionCreators.loginFB();
  },

  _onLogout: function() {
    // do something...
    UserActionCreators.logoutFB()
  },

});

module.exports = User;
