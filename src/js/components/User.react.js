/** @jsx React.DOM */

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var UserActionCreators = require('../actions/UserActionCreators');
var Button = require('react-bootstrap').Button;

var ENTER_KEY_CODE = 13;

var User = React.createClass({

  propTypes: {
    user: ReactPropTypes.object.isRequired
  },

  render: function() {
    if(this.props.user.loggedIn) {
        return (
            <div>
                <img src={this._getImgSrc()} />
                <span>Hello {this.props.user.firstName}</span>
                <button onClick={this._onLogout}>Logout</button>
            </div>
            );
    } else {
      return(
          <Button bsSize="medium" bsStyle="info" onClick={this._onLogin}>
          Login FB
          </Button>)
    }
  },

  _getImgSrc: function() {
    return "http://graph.facebook.com/" + this.props.user.serviceUserId + "/picture";
  },

  _onLogin: function() {
    UserActionCreators.loginFB();
  },

  _onLogout: function() {
    UserActionCreators.logoutFB()
  },

});

module.exports = User;
