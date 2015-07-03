import uuid from 'node-uuid'

export default {

  add (render, state, title) {
    state.todos.push({
      title,
      id: uuid.v4(),
      completed: false
    })
    render(state)
  },

  destroy (render, state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
    this.stopEditing()
  },

  edit (render, state, todo) {
    state.editing = todo.id
    render(state)
  },

  stopEditing (render, state) {
    state.editing = null
    render(state)
  },

  update (render, state, todo, value) {
    todo.title = value
    this.stopEditing()
  },

  toggle (render, state, todo) {
    todo.completed = !todo.completed
    render(state)
  },

  toggleAll (render, state, completed) {
    state.todos.forEach(todo => todo.completed = completed)
    render(state)
  },

  clearCompleted (render, state) {
    state.todos = state.todos.filter(todo => !todo.completed)
    render(state)
  }

}
