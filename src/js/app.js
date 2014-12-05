/**
 * Entrypoint to the client side application
 *
 * Bootstrapping of data and initialization of the main app view.
 * @jsx React.DOM
 */

// This file bootstraps the entire application.

var App = require('./components/App.react');
var Router = require('./router');
var EventAPIUtils = require('./utils/EventAPIUtils');
var React = require('react');
var LocalUserUtils = require('./utils/LocalUserUtils');
var SocketUtils = require('./utils/SocketUtils');
var GeoLocationUtils = require('./utils/GeoLocationUtils');
var Backbone = require('backbone');


// for debugging with the React Devtools
window.React = React;

// SocketUtils.init();
LocalUserUtils.init();

GeoLocationUtils.init();

EventAPIUtils.getAllEvents();



React.render(
  <App />,
  document.getElementsByClassName('js-react')[0]
);


var router = new Router();
Backbone.history.start();
