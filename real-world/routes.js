import React from 'react'
import { Route, IndexRoute } from 'react-router'
// import App from './containers/App'
// import UserPage from './containers/UserPage'
// import RepoPage from './containers/RepoPage'

import AppComponent from './containers/App'
import EventsComponent from './containers/Events'
import NewEventComponent from './containers/NewEvent'

/*
    Dashboard.js -----------------------|  |
        Sidebar.js ---------------------|  |
            AddEventButton.js ----------|  |
            User.js --------------------|  |
            UpcomingEvents.js ----------|  |
                UpcomingEvent.js -------|  |
        [*] NewEventForm.js ------------|  |
        [*] Events.js ------------------|  |
            Event.js -------------------|  |
                JoinLeaveButton.js -----|  |
                DeleteEventButton.js ---|  |

    Landing.react.jsx
    [*] ROUTER_HANDLER
*/

// TODO rename App to App
export default (
  <Route path="/" component={AppComponent} >
        <IndexRouter handler={EventsComponent} />
        <Route path="/event/new" handler={NewEventComponent} />
  </Route>
)



  // <Route path="/" component={App}>
  //   <Route path="/:login/:name"
  //          component={RepoPage} />
  //   <Route path="/:login"
  //          component={UserPage} />
  // </Route>