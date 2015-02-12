var Events = require('./Events.react.jsx');
var Navbar = require('./Navbar.react.jsx');
var React = require('react/addons');
var EventsStore = require('../stores/EventsStore');
var UserStore = require('../stores/UserStore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    EventsStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Navbar user={this.state.user} />
        <RouteHandler user={this.state.user} events={this.state.events} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(this._getState());
  },


  _getState: function() {
    return {
      events: EventsStore.getAll(),
      user: UserStore.getUser()
    };
  }

});

module.exports = Dashboard;
