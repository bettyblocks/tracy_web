import './css/app.scss'

import socket from './socket'
//import * as React from "react"

//
console.log(`Application "${VERSION}" running on "${ENV}" mode`)

import React, { Component } from 'react'
import { render } from 'react-dom'

class Root extends Component {
  render () {
    return <h1>omg so hot</h1>
  }
}

render(<Root />, document.getElementById('root'))
