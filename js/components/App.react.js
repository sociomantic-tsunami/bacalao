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

var Outline = require('./Outline.react');
var NodeActionCreators = require('../actions/NodeActionCreators');
var React = require('react');
var key = require('keymaster');

var App = React.createClass({

  componentDidMount: function() {
    key('j', function() {
      NodeActionCreators.nextVisibleNode();
    });

    key('k', function() {
      NodeActionCreators.previousVisibleNode();
    });

    key('space', function() {
      NodeActionCreators.toggleCollapseNode();
    });

  },

  render: function() {
    return (
      <div className="outlineapp">
        <Outline />
      </div>
    );
  }

});

module.exports = App;
