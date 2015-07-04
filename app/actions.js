import {Map} from 'immutable'
import uuid from 'node-uuid'

export default {

  add (render, state, title) {
    var todo = Map({
      title,
      id: uuid.v4(),
      completed: false
    })

    render(
      state.update('todos', todos => todos.push(todo))
    )
  },

  destroy (render, state, todo) {
    render(
      state.update('todos', todos => todos.delete(todos.indexOf(todo)))
    )
    this.stopEditing()
  },

  edit (render, state, todo) {
    render(
      state.set('editing', todo.get('id'))
    )
  },

  stopEditing (render, state) {
    render(
      state.set('editing', null)
    )
  },

  update (render, state, todo, title) {
    render(
      state.update('todos', todos => todos.set(
        todos.indexOf(todo), todo.set('title', title)
      ))
    )
    this.stopEditing()
  },

  toggle (render, state, todo) {
    render(
      state.update('todos', todos => todos.set(
        todos.indexOf(todo),
        todo.set('completed', !todo.get('completed'))
      ))
    )
  },

  toggleAll (render, state, completed) {
    render(
      state.update('todos', todos => todos.map(
        todo => todo.set('completed', completed)
      ))
    )
  },

  clearCompleted (render, state) {
    render(
      state.update('todos', todos => todos.filter(
        todo => !todo.get('completed')
      ))
    )
  }

}
