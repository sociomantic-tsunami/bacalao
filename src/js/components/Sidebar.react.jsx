var React = require('react/addons');
var Router = require('react-router');
var User = require('./User.react.jsx');
var UpcomingEvents = require('./UpcomingEvents.react.jsx');
var ReactPropTypes = React.PropTypes;
var RouteHandler = Router.RouteHandler;

require('../../sass/sidebar.scss');


var Sidebar = React.createClass({

  propTypes: {
   user: ReactPropTypes.object.isRequired
  },


  render: function() {
    return (
        <div className="sidebar">
            <User user={this.props.user} />
            <UpcomingEvents />
        </div>
    );
  }
});

module.exports = Sidebar;
