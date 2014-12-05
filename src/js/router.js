/**
 *  Backbone Router integrated into React
 */
var Backbone = require('backbone');
var React = require('react/addons');
var WelcomeComponent = require('./components/Welcome.react');

var Router = Backbone.Router.extend({

    routes : {
        'welcome' : 'welcome'
    },

    welcome : function( ){
        React.renderComponent(
            <WelcomeComponent urlState={ Backbone.history.fragment }/>,
            document.body
        );
    }
});

module.exports = Router;
