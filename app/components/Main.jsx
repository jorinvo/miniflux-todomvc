import React, { PropTypes } from 'react'
import {fromJS} from 'immutable'
import actionFunctions from '../actions'
import bindActions from '../utils/bindActions'
import {store} from '../utils/helpers'
import timeTravel from '../utils/timeTravel'
import Header from './Header.jsx'

const localStorageKey = 'react-todos'

export default React.createClass({

  propTypes: {
    children: PropTypes.any
  },

  // The whole app state is in one immutable Map.
  // We can't set it as state directly though.
  getInitialState () {
    return {
      data: fromJS({
        // We store the todos as array but in the state we want them as a Map.
        todos: store(localStorageKey)
          .reduce((todos, todo) => {
            todos[todo.id] = todo
            return todos
          }, {}),
        editing: null
      })
    }
  },

  componentWillMount () {
    this.bindActions()
    // Initialize once with data.
    if (process.env.NODE_ENV !== 'production') timeTravel(null, this.state.data)
  },

  bindActions () {
    // The render function can do everything with the state.
    // Compose it to your needs.
    var render = state => {
      if (process.env.NODE_ENV !== 'production') timeTravel(render, state)
      this.setState({ data: state })
      store(localStorageKey, state.get('todos').toArray())
    }
    this.actions = bindActions(actionFunctions, render, this.state.data)
  },

  render () {
    // If we don't re-bind the actions,
    // changes to them won't be visible while hot loading.
    // Note that this makes the PureRenderMixin useless in dev mode.
    if (process.env.NODE_ENV !== 'production') this.bindActions()

    // With the 1.0 version of React Router <RouteHandler> is gone and
    // I still need to figure out the best way to pass props to children.
    // .cloneElement() is probably not the nicest solution.
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
