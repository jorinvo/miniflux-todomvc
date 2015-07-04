import React, { PropTypes } from 'react'
import {fromJS} from 'immutable'
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
      data: fromJS({
        todos: store(storageKey),
        editing: null
      })
    }
  },

  componentWillMount () {
    this.bindActions()
  },

  bindActions () {
    var render = state => {
      this.setState({ data: state })
      store(storageKey, state.get('todos').toJS())
    }
    this.actions = bindActions(actionFunctions, render, this.state.data)
  },

  render () {
    // Allows hot reloading
    if (process.env.NODE_ENV !== 'production') this.bindActions()

    return (
      <div>

        <Header actions={this.actions} />

        {React.cloneElement(this.props.children, {
          actions: this.actions,
          todos: this.state.data.get('todos'),
          editing: this.state.data.get('editing')
        })}

      </div>
    )
  }

})
