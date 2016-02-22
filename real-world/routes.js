import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'



// TODO rename DashboardComponent to App
export default (
  <Route path="/" component={DashboardComponent} >
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