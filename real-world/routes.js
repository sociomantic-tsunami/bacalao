import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppComponent from './containers/App'
import EventsComponent from './containers/Events'
import NewEventComponent from './containers/NewEvent'


export default (
  <Route path="/" component={AppComponent} >
    <IndexRouter handler={EventsComponent} />
    <Route path="/event/new" handler={NewEventComponent} />
  </Route>
)