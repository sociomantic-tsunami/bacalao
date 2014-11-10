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
var SocketUtils = require('./utils/SocketUtils');
var GeoLocationUtils = require('./utils/GeoLocationUtils');
var hello = require('./lib/hello.all.min');

// for debugging with the React Devtools
window.React = React;

SocketUtils.init();
LocalUserUtils.init();
SocialLoginUtils.init();

GeoLocationUtils.init();

EventAPIUtils.getAllEvents();




React.renderComponent(
  <App />,
  document.getElementsByClassName('js-react')[0]
);
