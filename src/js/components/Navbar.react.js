var React = require('react/addons');
var Router = require('react-router');
var ReactPropTypes = React.PropTypes;
var RouteHandler = Router.RouteHandler;

require('../../sass/topbar.scss');



var Navbar = React.createClass({

  render: function() {

    propTypes: {
     user: ReactPropTypes.object.isRequired
    },

    return (
      <nav className="navbar navbar-fixed-top bacalao--navbar">
        <div className="container-fluid">
          <a className="navbar-brand">Bacalao</a>
          <div className="nav navbar-nav navbar-right">
            <User user={this.state.user} />
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
