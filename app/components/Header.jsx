import React, {PropTypes} from 'react'

const enterKey = 13

export default React.createClass({

  propTypes: {
    actions: PropTypes.object.isRequired
  },

  render () {
    return (
      <header className='header'>
        <h1>todos</h1>
        <input
          ref='newField'
          className='new-todo'
          placeholder='What needs to be done?'
          onKeyDown={this.handleKeyDown}
          autoFocus={true}
        />
      </header>
    )
  },

  handleKeyDown: function (event) {
    if (event.which !== enterKey) return
    event.preventDefault()

    var val = this.refs.newField.getDOMNode().value.trim()

    if (!val) return

    this.props.actions.add(val)
    this.refs.newField.getDOMNode().value = ''
  }

})