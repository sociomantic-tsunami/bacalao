import React, { Component, PropTypes } from 'react'
import Events from './Events'

// var EventsStore = require('../stores/EventsStore');
// var UserStore = require('../stores/UserStore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state =  { events: [], user: {} };
  }

  render() {
    return (
      <div>
        <RouteHandler user={this.state.user} events={this.state.events} />
      </div>
    );
  }
}
