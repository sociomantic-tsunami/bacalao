var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Constants = require('../constants/Constants');

// require('../../sass/_bacalao_init.scss');
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
              <span className="user--name">{this.props.user.firstName}</span>
            </div>
            <a href={Constants.Endpoints.LOGOUT} className="user--logout" >
                Logout
            </a>
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
    return this.props.user.picture;
  }

});

module.exports = User;
