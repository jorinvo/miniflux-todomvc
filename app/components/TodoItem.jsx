import React, {PropTypes} from 'react'
import classNames from 'classnames'

const escapeKey = 27
const enterKey = 13

export default React.createClass({

  propTypes: {
    actions: PropTypes.object.required,
    todo: PropTypes.object.required,
    editing: PropTypes.string
  },

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
          completed: todo.completed,
          editing: this.props.editing === todo.id
      })}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.completed}
            onChange={this.handleCheckboxClick}
          />
        <label onDoubleClick={this.handleDoubleClick}>
            {todo.title}
          </label>
          <button className='destroy' onClick={this.handleDestroyClick} />
        </div>
        <input
          ref='editField'
          className='edit'
          defaultValue={todo.title}
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
