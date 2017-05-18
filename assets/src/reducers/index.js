import { handleActions } from 'redux-actions'

export default {
  definitions: handleActions({
    GET_DEFINITIONS_RESULT: (state, action) => {
      return action.payload.definitions
    }
  }, {}),

  sessions: handleActions({
    GET_SESSIONS_RESULT: (state, action) => action.payload.sessions,
    NEW_SESSION: (state, action) => [action.payload].concat(state)
  }, []),

  traces: handleActions({
    // Set the traces
    GET_TRACES_RESULT: (state, action) => action.payload,
    // Prepend a new trace
    NEW_TRACE: (state, action) => [action.payload].concat(state)
  }, []),

  activeDefinition: handleActions({
    // Activate the given definition (id)
    SET_ACTIVE_DEFINITION: (state, action) => action.payload
  }, null),

  activeSession: handleActions({
    // Activate the given session (id)
    SET_ACTIVE_SESSION: (state, action) => action.payload,
    // Clear the session when the active definition changes
    SET_ACTIVE_DEFINITION: () => null,
  }, null)
}
