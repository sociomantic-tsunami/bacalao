var Events = require('./Events.react');
var User = require('./User.react');
var Navbar = require('./User.react');
var NewEvent = require('./NewEventRow.react');
var AddEventButton = require('./AddEventButton.react');
var React = require('react/addons');
var EventsStore = require('../stores/EventsStore');
var UserStore = require('../stores/UserStore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


require('../../sass/app.scss');
require('../../sass/topbar.scss');

var getAppState = function () {
  return {
    events: EventsStore.getAll(),
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
        <h1>Dashboard</h1>
        <RouteHandler user={this.state.user} events={this.state.events} />

        <AddEventButton
          onClick={this.onAddEvent}
          isLoggedIn={this.state.user.loggedIn} />
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
