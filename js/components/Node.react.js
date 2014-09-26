/** @jsx React.DOM */

var NodeActionCreators = require('../actions/NodeActionCreators');
var EmployeeUtils = require('../utils/EmployeeUtils');
var React = require('react');
var _ = require('underscore');
var Tooltip = require('react-bootstrap').Tooltip;
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;



var ReactPropTypes = React.PropTypes;

var Node = React.createClass({

  props: {
    node: ReactPropTypes.object
  },

  render: function() {
    var attendees = _.chain(this.props.attendees)
     .map(EmployeeUtils.getFullName)
     .reduce(function(memo, name) { return memo + ", " + name})
     .value();
    var hasJoined;


    return (
      <tr>
          <td>{this.getTime()}</td>
          <td>{this.props.place}</td>
          <td>
          <OverlayTrigger placement="left" overlay={<Tooltip>{attendees}</Tooltip>}>
            <Badge>{this.props.attendees.length}</Badge>
          </OverlayTrigger>
          </td>
          <td>{this.getOrganizer(this.props.creator)}</td>
          <td><Button bsSize="small" bsStyle="info">Join</Button></td>

      </tr>
    );
  },

  getTime: function() {
    var time = new Date(this.props.time * 1000);
    return time.toGMTString();
  },

  getOrganizer : function(shortName) {
    return EmployeeUtils.getFullName(shortName);
  },

  _onClick: function(event) {
    if (typeof this.props.node.key != 'undefined') {
      NodeActionCreators.selectNode(this.props.node.key);
    }
  }
});

module.exports = Node;
