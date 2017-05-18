import { take, call, all, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import actions from '../actions'

export default function* routerSaga() {
  let m
  while (true) {
    const action = yield take(LOCATION_CHANGE)
    const path = action.payload.pathname
    if (path === '/') {
      yield put(actions.setActiveDefinition(null))
    }
    if ((m = path.match(/^\/[ds]\/(\w+)/))) {
      yield put(actions.setActiveDefinition(m[1]))
    }
    if ((m = path.match(/^\/s\/\w+\/(\w+)/))) {
      yield put(actions.setActiveSession(m[1]))
    }
  }
}
