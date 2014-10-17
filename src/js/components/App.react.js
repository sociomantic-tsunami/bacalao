/** @jsx React.DOM */


var Outline = require('./Outline.react');
var User = require('./User.react');
var NodeActionCreators = require('../actions/NodeActionCreators');
var React = require('react/addons');
// var key = require('keymaster');
var OutlineStore = require('../stores/OutlineStore');
var UserStore = require('../stores/UserStore');
require('../../sass/app.scss');

var getAppState = function () {
  return {
    events: OutlineStore.getAll(),
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

    return (
      <div className="">
        <h1>wip</h1>
        <User
          user={this.state.user}
        />
        <Outline
          events={this.state.events}
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
