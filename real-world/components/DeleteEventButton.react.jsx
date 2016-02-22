var React = require('react');
var ReactPropTypes = React.PropTypes;
var Button = require('react-bootstrap').Button;

var DeleteEventButton = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    creator: React.PropTypes.object.isRequired,
    attendees: React.PropTypes.array.isRequired,
    _onEventDeleted: React.PropTypes.func.isRequired
  },

  render : function()
  {
    if(this.isVisible()){
      return (
        <Button bsSize="small" onClick={this.props._onEventDeleted}>
          Delete</Button>
      );
    }
    else
      return false;
  },

  // show the button if the user logged in is the creator of the event
  // and if he's the only one attending
  isVisible : function() {
    if( this.props.user._id == this.props.creator._id) {
      return (this.props.attendees.length === 0 || (this.props.attendees.length === 1 && this.props.attendees[0]._id === this.props.creator._id) );
    }

    return false;
  }


});

module.exports = DeleteEventButton;
