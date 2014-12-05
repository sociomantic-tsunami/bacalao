/**
 * Welcome Component
 */
var React = require('react/addons');
var UserStore = require('../stores/UserStore');


function getUserState() {
    return {
        user : UserStore.getUser()
    }
}

var WelcomeComponent = React.createClass({

    getInitialState : function()
    {
        return getUserState();
    },

    render : function() {
        console.log( this.props, this.state );

        return <div>We are in the page: {this.props.urlState}</div>;
    }
});

module.exports = WelcomeComponent;
