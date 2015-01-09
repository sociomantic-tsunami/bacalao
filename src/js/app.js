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
var RouterActionCreators = require('./actions/RouterActionCreators');
var UserAPIUtils = require('./utils/UserAPIUtils');
var EventAPIUtils = require('./utils/EventAPIUtils');



// Clean the hash after login redirect
if(window.location.hash === '#_=_') {
    window.location.hash = '#/';
}

// for debugging with the React Devtools
window.React = React;
SocketUtils.init();
GeoLocationUtils.init();
UserAPIUtils.getUserInfo();
EventAPIUtils.getAllEvents();
EventAPIUtils.getUpcomingEvents();


var getReactContainer = function() {
    var reactContainer = document.getElementsByClassName('js-react');
    if(reactContainer.length < 1) {
        console.error('Couldnt find the .js-react container');
        return false;
    }
    return reactContainer[0];
};


router.run(function(Handler, routerState) {
    // Dispatch an action
    RouterActionCreators.routeChange(routerState);
    React.render(<Handler />, getReactContainer());
});
