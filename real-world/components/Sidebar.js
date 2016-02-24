import React, { Component, PropTypes } from 'react'
import UpcomingEvents from './UpcomingEvents'
import AddEventButton from './AddEventButton'
import User from './User'

require('../../sass/sidebar.scss');


export default const Sidebar = ({ user, events, upcomingUser }) => {
  return (
      <div className="sidebar">
          <div className="sidebar__header">
              <AddEventButton
                  onClick={this.onAddEvent}
                  isLoggedIn={this.props.user.loggedIn} />
              <User user={this.props.user} />
          </div>
          <div className="sidebar__content">
              <UpcomingEvents />
          </div>
      </div>
  );
}

Sidebar.propTypes: {
   user: ReactPropTypes.object.isRequired
}
