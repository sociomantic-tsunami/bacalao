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
            <div className="sidebar__header">
                <User user={this.props.user} />
            </div>
            <div className="sidebar__content">
                <UpcomingEvents />
            </div>
        </div>
    );
  }
});

module.exports = Sidebar;
