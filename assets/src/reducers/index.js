import { handleActions } from 'redux-actions'

export default {
  definitions: handleActions({
    GET_DEFINITIONS_RESULT: (state, action) => {
      return action.payload.definitions
    }
  }, {})
}
