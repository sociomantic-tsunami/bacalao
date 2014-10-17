/** @jsx React.DOM */

var NodeActionCreators = require('../actions/NodeActionCreators');
var EmployeeUtils = require('../utils/EmployeeUtils');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('underscore');
var Tooltip = require('react-bootstrap').Tooltip;
var Badge = require('react-bootstrap').Badge;
var Button = require('react-bootstrap').Button;
var moment = require('moment')
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;



var EventRow = React.createClass({

  propTypes: {
    key: ReactPropTypes.string.isRequired,
    user: ReactPropTypes.object.isRequired,
    time: ReactPropTypes.number.isRequired,
    venue: ReactPropTypes.string.isRequired,
    creator: ReactPropTypes.string.isRequired,
    attendees: ReactPropTypes.array.isRequired
  },

  render: function() {
    var attendees = _.chain(this.props.attendees)
     .map(EmployeeUtils.getFullName)
     .reduce(function(memo, name) { return memo + ", " + name})
     .value();

    //TODO abstract the join/leave buttons to their own components(reusable with some props)
    var button = this.hasUserJoined() ?
      <Button bsSize="small" bsStyle="danger" onClick={this._onUserLeave}>Leave</Button> :
      <Button bsSize="small" bsStyle="info" onClick={this._onUserJoin}>Join</Button>;

    return (
      <tr>
          <td>{this.getTime()}</td>
          <td>{this.props.venue}</td>
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
    var time = moment.unix(this.props.time).fromNow();
    return time;
  },

  getOrganizer : function(shortName) {
    return EmployeeUtils.getFullName(shortName);
  },

  hasUserJoined : function() {
    if(this.props.user.loggedIn === false) {
      return false;
    }

    return _.contains(this.props.attendees, this.props.user._id);
  },

  _onUserJoin: function(event) {
    console.log('_onUserJoin');
  },

  _onUserLeave: function(event) {
    console.log('_onUserLeave');
  },
});

module.exports = EventRow;
