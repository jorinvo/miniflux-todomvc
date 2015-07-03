import React, { PropTypes } from 'react'
import actionFunctions from '../actions'
import bindActions from '../utils/bindActions'
import {store} from '../utils/helpers'
import Header from './Header.jsx'

const storageKey = 'react-todos'

export default React.createClass({

  propTypes: {
    children: PropTypes.any
  },

  getInitialState () {
    return {
      todos: store(storageKey),
      editing: null
    }
  },

  componentWillMount () {
    this.bindActions()
  },

  bindActions () {
    var render = state => {
      this.setState(state)
      store(storageKey, state.todos)
    }
    this.actions = bindActions(actionFunctions, render, this.state)
  },

  render () {
    // Allows hot reloading
    if (process.env.NODE_ENV !== 'production') this.bindActions()

    return (
      <div>

        <Header actions={this.actions} />

        {React.cloneElement(this.props.children, {
          actions: this.actions,
          todos: this.state.todos,
          editing: this.state.editing
        })}

      </div>
    )
  }

})
