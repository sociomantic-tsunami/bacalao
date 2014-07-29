/**
 * Copyright 2013-2014 Atlassian, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 */

var OutlineStore = require('../stores/OutlineStore');
var Node = require('./Node.react');

function getStateFromStores() {
  return {
    nodes: OutlineStore.getAll(),
    selected: OutlineStore.getSelected(),
  };
}

var React = require('react');

var Outline = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    OutlineStore.addChangeListener(this._onChange);
  },

  render: function() {
    var rootNode = this.state.nodes;
    var selected = this.state.selected;
    return (
      <div className="outline-section">
        <Node
          key={rootNode.key}
          node={rootNode}
          selected={selected}
        />
      </div>
    );

  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = Outline;
