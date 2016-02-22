import { CALL_API, Schemas } from '../middleware/api'
import * as ActionTypes from './actions'


export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'


joinEvent = (eventId) => {
  return {
    type: ActionTypes.JOIN_EVENT,
    eventId
  };
  EventAPIUtils.joinEvent(eventId, UserStore.getUserId());
};

leaveEvent = (eventId) => {
  return {
    type: ActionTypes.LEAVE_EVENT,
    eventId
  };
  EventAPIUtils.leaveEvent(eventId, UserStore.getUserId());
};


createEvent = (event) => {
  return {
    type: ActionTypes.CREATE_EVENT,
    event
  };

  EventAPIUtils.createEvent(EventsStore.getLastCreatedForAPI());
};

deleteEvent = (eventId) => {
  return {
    type: ActionTypes.DELETE_EVENT,
    eventId
  };

  EventAPIUtils.deleteEvent(eventId);
};




// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${login}`,
      schema: Schemas.USER
    }
  }
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchUser(login))
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
