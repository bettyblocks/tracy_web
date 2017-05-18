import { take, call, all, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import socket from '../socket'
import actions from '../actions'


// Now that you are connected, you can join channels with a topic:
let api = socket.channel('api', {});
api
  .join()
  .receive('ok', resp => { console.log('API joind successfully', resp) })
  .receive('error', resp => { console.log('Unable to join', resp) })

function* channelCall(pattern, resultActionCreator) {
  while (true) {
    let a = yield take(pattern)
    let response = yield new Promise((resolve, reject) => {
      api.push(pattern.toLowerCase())
         .receive('ok', r => resolve(r))
    })
    console.log('resp', response);

    yield put(resultActionCreator(response))
  }
}

export default function* () {
  yield all([
    channelCall("GET_DEFINITIONS", actions.getDefinitionsResult)
  ])
}
