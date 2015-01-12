var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Button = require('react-bootstrap').Button;
var Constants = require('../constants/Constants');

require('../../sass/user.scss');

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
            <Button href={Constants.Endpoints.LOGOUT} className="user--logout-button" bsSize="medium" bsStyle="info" >
                Logout
            </Button>
          </div>
        );
    } else {
      return(
        <div className="user">
        </div>
      );
    }
  },

  _getImgSrc: function() {
    return "http://graph.facebook.com/" + this.props.user.serviceUserId + "/picture";
  }

});

module.exports = User;
