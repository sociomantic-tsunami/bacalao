import React, { Component, PropTypes } from 'react'
import * as _ from 'underscore'
import Event from './Event.react.jsx'

const getEvent = (user, event) => {
  return (<Event
            key={event._id || event.cid}
            user={user}
            event={event}
          />);
};

export default const Events = (props) => {
    return (
        <div className="main">
                { _.map(this.props.events, _.partial(getEvent, this.props.user)) }
        </div>
    )
}


Events.propTypes = {
  events: ReactPropTypes.array.isRequired,
  user: ReactPropTypes.object.isRequired
}