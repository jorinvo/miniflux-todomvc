import React, {PropTypes} from 'react'
import {Map} from 'immutable'
import Pure from 'react/lib/ReactComponentWithPureRenderMixin'
import classNames from 'classnames'

const escapeKey = 27
const enterKey = 13

export default React.createClass({

  mixins: [Pure],

  propTypes: {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    todo: PropTypes.instanceOf(Map).isRequired,
    editing: PropTypes.string
  },

  // Focus todo when user starts editing a it.
  componentDidUpdate: function (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = this.refs.editField.getDOMNode()
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  },

  render () {
    var todo = this.props.todo

    return (
      <li className={classNames({
          completed: todo.get('completed'),
          editing: this.props.editing === todo.get('id')
      })}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.get('completed')}
            onChange={this.handleCheckboxClick}
          />
        <label onDoubleClick={this.handleDoubleClick}>
            {todo.get('title')}
          </label>
          <button className='destroy' onClick={this.handleDestroyClick} />
        </div>
        <input
          ref='editField'
          className='edit'
          defaultValue={todo.get('title')}
          onBlur={this.handleSubmit}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  },

  handleSubmit: function () {
    if (!this.props.editing) return

    var val = this.refs.editField.getDOMNode().value.trim()
    if (!val) return this.props.actions.destroy(this.props.todo)
    this.props.actions.update(this.props.todo, val)
  },

  handleDoubleClick: function () {
    this.props.actions.edit(this.props.todo)
  },

  handleCheckboxClick () {
    this.props.actions.toggle(this.props.todo)
  },

  handleDestroyClick () {
    this.props.actions.destroy(this.props.todo)
  },

  handleKeyDown: function (e) {
    if (e.which === escapeKey) {
      return this.props.actions.stopEditing()
    }
    if (e.which === enterKey) {
      this.handleSubmit()
    }
  }

})
