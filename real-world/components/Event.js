import React, { Component, PropTypes } from 'react'
import * as _ from 'underscore';
import JoinLeaveButton from './JoinLeaveButton'
import DeleteEventButton from './DeleteEventButton'
import * as moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// var EventActionCreators = require('../actions/EventActionCreators');
// require('../../sass/events.scss'); //TODO: SASS


let getAttendee = (creator, attendee) => {
  let { fname, lname } = attendee;
  let classes = "event-box__attendees-avatar "
  let tooltip = <Tooltip>{ `${fname} ${lname}` }</Tooltip>

  if(creator._id === attendee._id) {
    classes += 'event-box__attendees-avatar-creator'
  }

  return (<OverlayTrigger key={attendee._id || _.uniqueId('attendee-')} placement='top' overlay={tooltip} delayHide={100}>
    <img className={classes} src={attendee.picture} />
  </OverlayTrigger>)
}

export default class Event extends Component {
  render() {

    var attendees = _.map(this.props.event.attendees, _.partial(getAttendee, this.props.event.creator) )

    return (
        <div className="event-box">

          <div className="event-box__header">
              <div className="event-box__time__container">
                  <div className="time">
                    {this.getTime()}
                  </div>
                  <div className="time--from-now">
                    {this.getTimeFromNow()}
                  </div>
              </div>
              <div className="event-box__location">
                <h3 className="venue-name">
                  <a target="_blank" href={this.props.event.venue.url}>{this.props.event.venue.name}</a>
                </h3>
                <span className="venue-address">
                  {this.props.event.venue.formatted_address}
                </span>
              </div>
          </div>
          <div className="event-box__content">
            <div className="event-box__details">
              {this.props.event.details}
            </div>


            <div className="event-box__attendees">
                <span className="">Coming&nbsp;

                {this.props.event.attendees.length}
                {this.props.event.maxAttendees > 0 ? '/'+this.props.event.maxAttendees : '' }

                </span>

                <div className="event-box__attendee-pictures">
                  {attendees}
                </div>
            </div>
            <div className="button__container">
                  <JoinLeaveButton
                     user={this.props.user}
                     maxAttendees={this.props.event.maxAttendees}
                     attendees={this.props.event.attendees}
                     _onUserJoin={this._onUserJoin}
                     _onUserLeave={this._onUserLeave}
                  />

                  <DeleteEventButton
                     user={this.props.user}
                     creator={this.props.event.creator}
                     attendees={this.props.event.attendees}
                     _onEventDeleted={this._onEventDeleted}
                  />
            </div>
          </div>
        </div>
    )
  }

  getTime() {
    var time = moment(this.props.event.time).format( 'h:mm' )
    return time
  }

  getTimeFromNow() {
    var timeFromNow = moment(this.props.event.time).calendar()
    return timeFromNow
  }

  getOrganizer(user) {
    return [user.firstName, user.lastName].join(' ')
  }

  hasUserJoined() {
    if(this.props.user.loggedIn === false) {
      return false
    }

    for (var i = this.props.event.attendees.length - 1; i >= 0; i--) {
      if(this.props.event.attendees[i]._id == this.props.user._id) {
        return true
      }
    }
    return false
  }

  _onUserJoin(event) {
    if(!this.props.event._id) {
      console.error('cant join before its saved on the server')
      return
    }
    // dispatch action
    // TODO EventActionCreators.joinEvent(this.props.event._id);
  }

  _onUserLeave(event) {
    if(!this.props.event._id) {
      console.error('cant leave before its saved on the server')
      return
    }
    // dispatch action
    // TODO EventActionCreators.leaveEvent(this.props.event._id);
  }

  _onEventDeleted(event) {
    if(!this.props.event._id) {
      console.error('cant delete before its saved on the server')
      return
    }
    // dispatch action
    // TODO EventActionCreators.deleteEvent(this.props.event._id);
  }
}


Event.propTypes = {
  key: PropTypes.string,
  user: PropTypes.object.isRequired,
  event: React.PropTypes.shape({
    maxAttendees: PropTypes.number.isRequired,
    time: PropTypes.object.isRequired,
    details: PropTypes.string.isRequired,
    venue: PropTypes.object.isRequired,
    creator: PropTypes.object.isRequired,
    attendees: PropTypes.array.isRequired
  })
}
