import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Layout from './components/Layout'
import reducer from './reducer'

// import logo from './logo.svg'
import './App.css'

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout/>
      </Provider>
    )
  }
}

export default App
