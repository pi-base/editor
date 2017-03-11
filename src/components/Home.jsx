import React from 'react'
import { connect } from 'react-redux'

import * as Q from '../queries'

class Home extends React.Component {
  render() {
    return (
      <main>
        <p>{this.props.results}</p>
      </main>
    )
  }
}

export default connect(
  (state) => ({
    results: Q.searchResults(state)
  })
)(Home)
