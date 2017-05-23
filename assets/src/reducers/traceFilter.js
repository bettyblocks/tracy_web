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

const filterState = localStorageState('traceFilter', {open: false, text: '', types: ['call', 'return']})

export default handleActions({
  SET_TRACES_FILTER: (state, action) => filterState.save(Object.assign({}, state, action.payload)),
  RESET_TRACES_FILTER: (state, action) => initialTraceFilter,
  TOGGLE_TRACES_FILTER: (state, action) => filterState.save({ ...state, open: !state.open}),
  TOGGLE_TRACES_TYPE: (state, action) => {
    let types = state.types.slice()
    let { type } = action.payload
    let idx = types.indexOf(type)
    if (idx >= 0) {
      types.splice(idx, 1)
    } else {
      types.push(type)
    }
    return filterState.save({ ...state, types})
  }
}, filterState.load())
