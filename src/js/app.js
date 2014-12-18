/**
 * Entrypoint to the client side application
 *
 * Bootstrapping of data and initialization of the main app view.
 * @jsx React.DOM
 */

// This file bootstraps the entire application.

var router = require('./router');
var React = require('react');
var SocketUtils = require('./utils/SocketUtils');
var GeoLocationUtils = require('./utils/GeoLocationUtils');
var Backbone = require('backbone');


// for debugging with the React Devtools
window.React = React;
SocketUtils.init();


GeoLocationUtils.init();

Backbone.history.start();
