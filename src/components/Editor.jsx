import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, FormControl } from 'react-bootstrap'

class Editor extends React.Component {
  componentWillMount() {
    this.setState({
      body: this.props.body,
      preview: this.preview(this.props.body)
    })
  }

  handleChange(e) {
    this.setState({
      preview: this.preview(e.target.value)
    })
  }

  preview(text) {
    return text
  }

  render() {
    const {path} = this.props

    return (
      <main>
        <p>Editing <code>{path}</code></p>
        <Row>
          <Col md={6}>
            <FormControl
              componentClass="textarea"
              value={this.state.body}
              rows={40}
              onChange={this.handleChange.bind(this)
            }/>
          </Col>
          <Col md={6}>
            {this.state.preview}
          </Col>
        </Row>
      </main>
    )
  }
}

export default connect(
  (state) => ({
    path: state.getIn(['editor', 'path']),
    body: state.getIn(['editor', 'body'])
  })
)(Editor)
