/**
 * Entrypoint to the client side application
 *
 * Bootstrapping of data and initialization of the main app view.
 * @jsx React.DOM
 */

// This file bootstraps the entire application.

var App = require('./components/App.react');
var EventAPIUtils = require('./utils/EventAPIUtils');
var React = require('react');
var SocialLoginUtils = require('./utils/SocialLoginUtils');
var LocalUserUtils = require('./utils/LocalUserUtils');
var hello = require('./lib/hello.all.min');

window.React = React;


LocalUserUtils.init();
SocialLoginUtils.init();

EventAPIUtils.getAllEvents();

React.renderComponent(
  <App />,
  document.getElementsByClassName('js-react')[0]
);
