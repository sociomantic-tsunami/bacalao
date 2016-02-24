

// This is a copy of all the constants from the old structure.
// a better convention would be to use Request/Receieve to name
// all async actions where request is when it's requested
// and received is when it returns


export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_UPCOMING_EVENTS = 'FETCH_UPCOMING_EVENTS';
export const FETCH_USER = 'FETCH_USER';

export const GOT_LOCATION = 'GOT_LOCATION';
export const INIT_USER = 'INIT_USER';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATED_EVENT = 'CREATED_EVENT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const JOINED_EVENT = 'JOINED_EVENT';
export const LEAVE_EVENT = 'LEAVE_EVENT';
export const LEFT_EVENT = 'LEFT_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETED_EVENT = 'DELETED_EVENT';


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}