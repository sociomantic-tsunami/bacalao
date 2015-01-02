var React = require('react/addons');
var LandingComponent = require('./components/Landing.react');
var NewEventComponent = require('./components/NewEventRow.react');
var EventsComponent = require('./components/Events.react');
var DashboardComponent = require('./components/Dashboard.react');
var UserAPIUtils = require('./utils/UserAPIUtils');
var EventAPIUtils = require('./utils/EventAPIUtils');
var Constants = require('./constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('./dispatcher/AppDispatcher');
var _ = require('underscore');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var routes = (
    <Route name="dashboard" path="/" handler={DashboardComponent}>
        <Route name="new-event" path="/event/new" handler={NewEventComponent} />
        <DefaultRoute handler={EventsComponent} />
    </Route>
);



module.exports = Router.create({
    routes: routes
});
