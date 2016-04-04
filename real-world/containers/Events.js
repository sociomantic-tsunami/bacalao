import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { leaveEvent, joinEvent, deleteEvent } from '../actions'

import Event from '../components/Event.js'


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
      <List renderItem={this.renderEvent}
                items={zip(starredRepos, starredRepoOwners)}
                onLoadMoreClick={this.handleLoadMoreClick}
                loadingLabel={`Loading ${login}’s starred...`}
                {...starredPagination} />
      { events.map(event => <Event user={user} event={event} />) }
    </div>
  )
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}


export default Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

