import { take, call, all, put, takeEvery } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import socket from '../socket'
import store from '../store'
import actions from '../actions'

import routerSaga from './router'

// Now that you are connected, you can join channels with a topic:
export let api = socket.channel('api', {});
api
  .join()
  .receive('error', resp => { console.log('Unable to join', resp) })

api.on('new_session', session => {
  store.dispatch(actions.setActiveSession(session.id))
  store.dispatch(actions.newSession(session))
})


function* channelCall(pattern, resultActionCreator) {
  while (true) {
    let a = yield take(pattern)
    let response = yield new Promise((resolve, reject) => {
      api.push(pattern.toLowerCase(), a.payload)
         .receive('ok', r => resolve(r))
    })

    yield put(resultActionCreator(response))
  }
}

function* definitionLoader() {
  while (true) {
    let id = (yield take('SET_ACTIVE_DEFINITION')).payload
    yield put(actions.getSessions(id))
  }
}

function* putDefinition(action) {
  yield new Promise((resolve) =>
    api.push('put_definition', action.payload)
       .receive('ok', resolve))
  yield put(actions.getDefinitions())
}

function* removeDefinition(action) {
  yield new Promise((resolve) =>
    api.push('remove_definition', action.payload)
       .receive('ok', resolve))
}

function* tracesLoader() {
  let channel = null;
  while (true) {
    let id = (yield take('SET_ACTIVE_SESSION')).payload
    if (channel !== null) {
      channel.leave();
    }

    channel = socket.channel('tracer:' + id);
    channel.join()
           .receive('error', resp => { console.log('Unable to join', resp) })

    channel.on('traces', ({traces}) => {
      store.dispatch(actions.getTracesResult(traces))
    })

    channel.on('add_traces', ({traces}) => {
      store.dispatch(actions.addTraces(traces))
    })

  }
}


export default function* () {
  yield all([
    channelCall("GET_DEFINITIONS", actions.getDefinitionsResult),
    channelCall("GET_SESSIONS", actions.getSessionsResult),
    takeEvery("REMOVE_DEFINITION", removeDefinition),
    takeEvery("PUT_DEFINITION", putDefinition),
    routerSaga(),
    definitionLoader(),
    tracesLoader()
  ])
}
