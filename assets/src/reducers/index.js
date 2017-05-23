import { handleActions } from 'redux-actions'
import traceFilter from './traceFilter'

export default {

  // definitions

  definitions: handleActions({
    GET_DEFINITIONS_RESULT: (state, action) => {
      return action.payload.definitions
    }
  }, {}),

  activeDefinition: handleActions({
    // Activate the given definition (id)
    SET_ACTIVE_DEFINITION: (state, action) => action.payload
  }, null),

  // session

  sessions: handleActions({
    GET_SESSIONS_RESULT: (state, action) => action.payload.sessions,
    NEW_SESSION: (state, action) => [action.payload].concat(state)
  }, []),

  activeSession: handleActions({
    // Activate the given session (id)
    SET_ACTIVE_SESSION: (state, action) => action.payload,
    // Clear the session when the active definition changes
    SET_ACTIVE_DEFINITION: () => null,
  }, null),

  sessionDialogShowing: handleActions({
    SHOW_SESSION_DIALOG: (state, action) => action.payload
  }, false),

  sessionScrollToIndex: handleActions({
    SET_ACTIVE_SESSION: (state, action) => 0,
    ADD_TRACES: (state, action) => 100000
  }, 0),

  // traces

  traces: handleActions({
    // Set the traces
    GET_TRACES_RESULT: (state, action) => action.payload,
    // Append new traces
    ADD_TRACES: (state, action) => state.concat(action.payload)
  }, []),

  traceDialog: handleActions({
    SHOW_TRACE_DIALOG: (state, action) => action.payload
  }, null),

  traceFilter,

  snackBar: handleActions({
    SHOW_SNACKBAR: (state, action) => action.payload
  }, null),

}
