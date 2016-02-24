import * as ActionTypes from '../actions/actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}


const events = (state = [], action) => {
  const { type, response, error } = action
  switch (type) {
    case FETCH_EVENTS:
      if(error) {
        return state
      }
      if(response) {
        return response
      }

    default:
      return state
  }
}

const upcoming = (state = [], action) => {
  const { type, response, error } = action
  switch (type) {
    case FETCH_UPCOMING_EVENTS:
      if(error) {
        console.log(error)
        return state
      }
      if(response) {
        return response
      }

    default:
      return state
  }
}


const user = (state = {}, action) => {
  const { type, response, error } = action
  switch (type) {
    case FETCH_USER:
      if(error) {
        console.log(error)
        return state
      }
      if(response) {
        return response
      }

    default:
      return state
  }
}



const rootReducer = combineReducers({
  events,
  upcoming,
  errorMessage,
  routing
})


export default rootReducer
