/**
 * Entrypoint to the client side application
 * 
 * Bootstrapping of data and initialization of the main app view.
 * @jsx React.DOM
 */

// This file bootstraps the entire application.

var App = require('./components/App.react');
var OutlineStartingData = require('./OutlineStartingData');
var OutlineWebAPIUtils = require('./utils/OutlineWebAPIUtils');
var React = require('react');
var SocialLoginUtils = require('./utils/SocialLoginUtils');
var LocalUserUtils = require('./utils/LocalUserUtils');
var hello = require('../bower_components/hello/dist/hello.all.min');

window.React = React;


LocalUserUtils.init();
OutlineStartingData.init();
SocialLoginUtils.init();

OutlineWebAPIUtils.getAllNodes();

React.renderComponent(
  <App />,
  document.getElementsByClassName('js-react')[0]
);
