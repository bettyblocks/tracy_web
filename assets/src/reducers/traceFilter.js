import { handleActions } from 'redux-actions'

function localStorageState(key, defaultState) {
  return {
    save: (state) => {
      localStorage[key] = JSON.stringify(state)
      return state
    },
    load: () => {
      return key in localStorage ? JSON.parse(localStorage[key]) : defaultState
    }
  }
}

const filterState = localStorageState('traceFilter', {open: false, text: ''})

export default handleActions({
  SET_TRACES_FILTER: (state, action) => filterState.save(Object.assign({}, state, action.payload)),
  RESET_TRACES_FILTER: (state, action) => initialTraceFilter,
  TOGGLE_TRACES_FILTER: (state, action) => filterState.save({ ...state, open: !state.open})
}, filterState.load())
