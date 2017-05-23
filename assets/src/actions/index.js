import { createActions } from 'redux-actions'

export default createActions({
  SET_ACTIVE_DEFINITION: x => x,
  GET_DEFINITIONS: x => x,
  GET_DEFINITIONS_RESULT: x => x,
  PUT_DEFINITION: x => x,
  REMOVE_DEFINITION: x => x,

  SET_ACTIVE_SESSION: x => x,
  GET_SESSIONS: x => x,
  GET_SESSIONS_RESULT: x => x,
  NEW_SESSION: x => x,

  GET_TRACES_RESULT: x => x,
  ADD_TRACES: x => x,
  SET_TRACES_FILTER: x => x,
  TOGGLE_TRACES_FILTER: x => x,
  TOGGLE_TRACES_TYPE: x => x,

  SHOW_SESSION_DIALOG: x => x,
  SHOW_TRACE_DIALOG: x => x,

  SHOW_SNACKBAR: x => x
})
