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
var EmployeeUtils = require('../utils/EmployeeUtils');

var React = require('react');

var ReactPropTypes = React.PropTypes;

var Node = React.createClass({

  props: {
    node: ReactPropTypes.object
  },

  render: function() {
    return (
      <tr>
          <td>{this.time()}</td>
          <td>{this.props.place}</td>
          <td>{this.organizer(this.props.creator)}</td>
      </tr>
    );
  },

  time: function() {
    var time = new Date(this.props.time * 1000);
    return time.toGMTString();
  },

  organizer : function() {
    EmployeeUtils.getFullName(getFullName);
  },

  _onClick: function(event) {
    if (typeof this.props.node.key != 'undefined') {
      NodeActionCreators.selectNode(this.props.node.key);
    }
  }
});

module.exports = Node;
