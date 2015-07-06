import React, { PropTypes } from 'react'
import {Map} from 'immutable'
import Pure from 'react/lib/ReactComponentWithPureRenderMixin'
import Footer from './Footer'
import TodoItem from './TodoItem'

export default React.createClass({

  mixins: [Pure],

  propTypes: {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    todos: PropTypes.instanceOf(Map).isRequired,
    editing: PropTypes.string,
    params: PropTypes.object.isRequired
  },

  render () {
    // Just calculate this once.
    var activeCount = this.props.todos
      .reduce((x, todo) => todo.get('completed') ? x : x + 1, 0)

    return (
      <div>
        {this.renderTodoList(activeCount)}
        {this.renderFooter(activeCount)}
      </div>
    )
  },

  renderTodoList (activeCount) {
    if (this.props.todos.isEmpty()) return

    return (
      <section className='main'>
        <input
          className='toggle-all'
          type='checkbox'
          onChange={this.toggleAll}
          checked={!activeCount}
        />
      <ul className='todo-list'>
          {this.renderTodoItems()}
        </ul>
      </section>
    )
  },

  renderTodoItems () {
    return this.props.todos
      .filter(todoFilters[this.getFilterOption()])
      .map((todo, id) => (
        <TodoItem
          key = {id}
          todo={todo}
          actions={this.props.actions}
          editing={this.props.editing}
        />
      ))
      // React doesn't support Maps yet
      .toList()
  },

  renderFooter (activeCount) {
    var completedCount = this.props.todos.size - activeCount

    if (!activeCount && !completedCount) return

    return (<Footer
      actions={this.props.actions}
      count={activeCount}
      completedCount={completedCount}
      showAll={this.getFilterOption() === 'all'}
    />)
  },

  toggleAll (e) {
    this.props.actions.toggleAll(e.target.checked)
  },

  // Since there are only 3 options, it's fine to calculate it this way.
  getFilterOption () {
    var o = this.props.params.option
    if (o === 'completed' || o === 'active') return o
    return 'all'
  }

})

var todoFilters = {
  active: todo => !todo.get('completed'),
  completed: todo => todo.get('completed'),
  all: () => true
}
