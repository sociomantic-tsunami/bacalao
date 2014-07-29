/**
 * Copyright 2013-2014 Atlassian
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

var NodeActionCreators = require('../actions/NodeActionCreators');
var SelectedMarker = require('./SelectedMarker.react');

function getNode(node, selected) {
  return (
    <Node
      key={node.key}
      node={node}
      selected={selected}
    />
  );
}

var React = require('react');

var ReactPropTypes = React.PropTypes;

var Node = React.createClass({

  props: {
    node: ReactPropTypes.object
  },

  render: function() {
    var node = this.props.node;
    var selected = this.props.selected;

    if (typeof node.children != 'undefined') {
      if (typeof node.collapsed != 'undefined' && node.collapsed == true) {
        return (
          <li className="node-item" onKeyDown={this._onToggleCollapseNode}>
            <SelectedMarker currNodeKey={node.key} selected={selected} />
            <div className="node-content" onClick={this._onClick}>+{node.key} - {node.content}</div>
          </li>
        );
      }
      var nodeTreeItems = node.children.map(function(x) { return getNode(x, selected); });
      return (
        <li className="node-item">
          <SelectedMarker currNodeKey={node.key} selected={selected} />
          <div className="node-content" onClick={this._onClick}>{node.key} - {node.content}</div>
          <div className="children-section">
            <ul className="node-list" ref="nodeList">
              {nodeTreeItems}
            </ul>
          </div>
        </li>
      );
    } else {
      return (
        <li className="node-item">
          <SelectedMarker currNodeKey={node.key} selected={selected} />
          <div className="node-content" onClick={this._onClick}>{node.key} - {node.content}</div>
        </li>
      );
    }
  },

  _onClick: function(event) {
    if (typeof this.props.node.key != 'undefined') {
      NodeActionCreators.selectNode(this.props.node.key);
    }
  }
});

module.exports = Node;
