/** @jsx React.DOM */

var NodeActionCreators = require('../actions/NodeActionCreators');
var EmployeeUtils = require('../utils/EmployeeUtils');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Tooltip = require('react-bootstrap').Tooltip;
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;



var Node = React.createClass({

  propTypes: {
    key: ReactPropTypes.string.isRequired,
    user: ReactPropTypes.object.isRequired,
    time: ReactPropTypes.number.isRequired,
    place: ReactPropTypes.string.isRequired,
    creator: ReactPropTypes.string.isRequired,
    attendees: ReactPropTypes.array.isRequired
  },

  render: function() {
    var attendees = _.chain(this.props.attendees)
     .map(EmployeeUtils.getFullName)
     .reduce(function(memo, name) { return memo + ", " + name})
     .value();

    var button = this.hasUserJoined() ? 
      <Button bsSize="small" bsStyle="danger">Leave</Button> :
      <Button bsSize="small" bsStyle="info">Join</Button>;

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
          <td>{button}</td>

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

  hasUserJoined : function() {
    if(this.props.user.loggedIn === false) {
      return false;
    } 

    return _.contains(this.props.attendees, this.props.user.username);
  },

  _onClick: function(event) {
    if (typeof this.props.node.key != 'undefined') {
      NodeActionCreators.selectNode(this.props.node.key);
    }
  }
});

module.exports = Node;
