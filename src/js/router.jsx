var React = require('react');
var LandingComponent = require('./components/Landing.react.jsx');
var NewEventComponent = require('./components/NewEventForm.react.jsx');
var EventsComponent = require('./components/Events.react.jsx');
var DashboardComponent = require('./components/Dashboard.react.jsx');
var UserAPIUtils = require('./utils/UserAPIUtils');
var EventAPIUtils = require('./utils/EventAPIUtils');
var Constants = require('./constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('./dispatcher/AppDispatcher');
var _ = require('underscore');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;

var routes = (
    <Route name="dashboard" path="/" handler={DashboardComponent}>
        <Route name="new-event" path="/event/new" handler={NewEventComponent} />
        <DefaultRoute handler={EventsComponent} />
    </Route>
);



module.exports = Router.create({
    routes: routes
});
