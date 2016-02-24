import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { leaveEvent } from '../actions'

import Event from '../components/Event.react.jsx'


const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEventLeave: (id) => {
      dispatch(leaveEvent(id))
    },
    onEventJoin: (id) => {
      dispatch(joinEvent(id))
    },
    onEventDelete: (id) => {
      dispatch(deleteEvent(id))
    }
  }
}


let Events = ({ events, user }) => {
  return (
    <div className="main">
      { events.map(event => <Event user={user} event={event} />) }
    </div>
  )
}

Events.propTypes = {
  events: ReactPropTypes.array.isRequired,
  user: ReactPropTypes.object.isRequired
}


export default Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

