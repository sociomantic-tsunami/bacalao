var React = require('react/addons');
var LandingComponent = require('./components/Landing.react');
var NewEventComponent = require('./components/NewEventRow.react');
var EventsComponent = require('./Events.react');
var AppComponent = require('./components/App.react');
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
    <Route>

        <Route name="landing" path="/" handler={LandingComponent}>

        <Route name="app" path="/dashboard" handler={AppComponent}>
            <Route name="" path="/event/new" handler={NewEventComponent}>
            <DefaultRoute handler={EventsComponent}/>
        </Route>
    </Route>
);

// var getReactContainer = function() {
//     var reactContainer = document.getElementsByClassName('js-react');
//     if(reactContainer.length < 1) {
//         console.error('Couldnt find the .js-react container');
//         return false;
//     }
//     return reactContainer[0];
// };

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementsByClassName('js-react')[0])
});

// var Router = Backbone.Router.extend({

//     routes : _.invert(Routes),

//     // initialize: function() {
//     //     AppDispatcher.register(_.bind(function(payload) {
//     //         var action = payload.action;
//     //         if(action.type === ActionTypes.CHANGE_ROUTE) {
//     //             this.navigate(action.route, { trigger: true });
//     //         }

//     //     }, this));
//     // },

//     getReactContainer: function() {
//         var reactContainer = document.getElementsByClassName('js-react');
//         if(reactContainer.length < 1) {
//             console.error('Couldnt find the .js-react container');
//             return false;
//         }
//         return reactContainer[0];
//     },

//     landing: function() {
//         React.render(
//             <LandingComponent />,
//             this.getReactContainer()
//         );
//     },


//     welcome: function( ){
//         UserAPIUtils.getUserInfo();
//         EventAPIUtils.getAllEvents();


//         React.render(
//             <AppComponent />,
//             this.getReactContainer()
//         );
//     },

//     newEvent: function() {
//     // <NewEvent
//     //   loggedIn={this.state.user.loggedIn}
//     //   onCreate={this.hideNewEventForm}
//     //  />;
//     }

// });



module.exports = new Router();
