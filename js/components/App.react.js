/** @jsx React.DOM */


var Outline = require('./Outline.react');
var User = require('./User.react');
var NodeActionCreators = require('../actions/NodeActionCreators');
var React = require('react/addons');
// var key = require('keymaster');
var OutlineStore = require('../stores/OutlineStore');
var UserStore = require('../stores/UserStore');

var getAppState = function () {
  return {
    nodes: OutlineStore.getAll(),
    user: UserStore.getUser()
  };
}


var App = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    OutlineStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'container': true
    });

    return (
      <div className="{classes}">
        <h1>Bacalao</h1>
        <User
          user={this.state.user}
        />
        <Outline 
          nodes={this.state.nodes}  
          user={this.state.user}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = App;
