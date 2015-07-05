import {Map} from 'immutable'
import uuid from 'node-uuid'

export default {

  add (render, state, title) {
    var id = uuid.v4()
    var todo = Map({
      title,
      id,
      completed: false
    })

    render(
      state.setIn(['todos', id], todo)
    )
  },

  destroy (render, state, todo) {
    render(
      state.deleteIn(['todos', todo.get('id')])
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
      state.setIn(['todos', todo.get('id'), 'title'], title)
    )
    this.stopEditing()
  },

  toggle (render, state, todo) {
    render(
      state.setIn(['todos', todo.get('id'), 'completed'], !todo.get('completed'))
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
