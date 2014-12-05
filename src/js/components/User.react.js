var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var UserActionCreators = require('../actions/UserActionCreators');
var Button = require('react-bootstrap').Button;
require('../../sass/user.scss');

var ENTER_KEY_CODE = 13;

var User = React.createClass({

  propTypes: {
    user: ReactPropTypes.object.isRequired
  },

  render: function() {
    if(this.props.user.loggedIn) {
        return (
          <div className="user">
            <div className="user--current-user">
              <img className="user--profile-pic" src={this._getImgSrc()} />
              <span className="user--greeting">Hello {this.props.user.firstName}!</span>
            </div>
            <Button className="user--logout-button" bsSize="medium" bsStyle="info" onClick={this._onLogout}>
                Logout
            </Button>
          </div>
            );
    } else {
        //<a href="/auth/facebook">Login with Facebook</a>
      return(
        <div className="user">
          <Button href="/auth/facebook" className="user--login-button" bsSize="medium" bsStyle="info" onClick={this._onLogin}>
            Login with Facebook
          </Button>
        </div>
        );
    }
  },

  _getImgSrc: function() {
    return "http://graph.facebook.com/" + this.props.user.serviceUserId + "/picture";
  },

  _onLogout: function() {
    UserActionCreators.logout()
  },

});

module.exports = User;
