var React = require('react/addons');
var Router = require('react-router');
var User = require('./User.react');
var ReactPropTypes = React.PropTypes;
var RouteHandler = Router.RouteHandler;

require('../../sass/topbar.scss');



var Navbar = React.createClass({

  propTypes: {
   user: ReactPropTypes.object.isRequired
  },


  render: function() {
    return (
      <nav className="navbar bacalao--navbar">
        <div className="container-fluid">
          <a className="navbar-brand">Bacalao</a>
          <div className="nav navbar-nav navbar-right">
            <User user={this.props.user} />
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
