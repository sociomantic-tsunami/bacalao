var Events = require('./Events.react.jsx');
var Navbar = require('./Navbar.react.jsx');
var React = require('react/addons');
var EventsStore = require('../stores/EventsStore');
var UserStore = require('../stores/UserStore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

require('../../sass/app.scss');

var getAppState = function () {
  return {
    events: EventsStore.getAll(),
    upcomingEvents: EventsStore.getUpcoming(),
    user: UserStore.getUser()
  };
};


var App = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    EventsStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Navbar user={this.state.user} />
        <RouteHandler user={this.state.user} events={this.state.events} upcomingEvents={this.state.upcomingEvents} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = App;
