/* global MathJax */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { Row, Col, FormControl } from 'react-bootstrap'

import core from 'pi-base-core'

class Preview extends React.Component {
  queue() {
    const node = ReactDOM.findDOMNode(this)
    if (typeof(MathJax) !== `undefined`) {
      MathJax.Hub.Queue([`Typeset`, MathJax.Hub, node])
    }
  }

  componentDidMount() {
    this.queue()
  }

  componentDidUpdate() {
    this.queue()
  }

  render() {
    const { raw } = this.props
    const markup = core.markdown(raw)

    return <div className="markdown" dangerouslySetInnerHTML={{__html: markup}}/>
  }
}

class Editor extends React.Component {
  componentWillMount() {
    this.setState({
      body: this.props.body,
      preview: this.preview(this.props.body)
    })
  }

  handleChange(e) {
    this.setState({
      body:    e.target.value,
      preview: this.preview(e.target.value)
    })
  }

  preview(text) {
    const frags = text.split('---')
    return core.markdown(frags[frags.length - 1])
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
              onChange={this.handleChange.bind(this)}
            />
          </Col>
          <Col md={6}>
            <Preview raw={this.state.preview}/>
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
