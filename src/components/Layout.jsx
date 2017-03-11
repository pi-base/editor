import React from 'react'
import { connect } from 'react-redux'

import { Navbar, FormControl } from 'react-bootstrap'

import { renderPartial } from '../routes'

import * as A from '../actions'

class Layout extends React.Component {
  componentWillMount() {
    this.props.runSearch('!')
  }
  
  handleChange(e) {
    this.props.runSearch(e.target.value)
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">PiBase Editor</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="container">
          <form>
            <FormControl type="text" onChange={this.handleChange.bind(this)}/>
          </form>

          <hr/>

          <this.props.component {...this.props}/>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    component: renderPartial(state)
  }),
  (dispatch) => ({
    runSearch: (q) => (A.runSearch(dispatch, q))
  })
)(Layout)
