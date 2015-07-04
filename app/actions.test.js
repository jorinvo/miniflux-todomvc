import test from 'tape'
import {fromJS} from 'immutable'
import actions from './actions'

var state = fromJS({
  editing: null,
  todos: [
    { id: '1', title: 'foo', completed: false },
    { id: '2', title: 'bar', completed: true },
    { id: '3', title: 'badz', completed: false }
  ]
})

var todos = state.get('todos')

test('# actions', t => {

  t.test('add()', t => {
    t.plan(3)

    var title = 'test todo'

    actions.add(s => {
      var todo = s.get('todos').last()

      t.equal(todo.get('title'), title, 'title matches')
      t.ok(todo.has('id'), 'has id')
      t.equal(todo.get('completed'), false, 'not completed')
    }, state, title)
  })

  t.test('destroy()', t => {
    t.plan(3)

    var todo = todos.first()

    actions.destroy.call({
      stopEditing () {
        t.ok(true, 'calls stopEditing')
      }
    }, s => {
      t.equal(s.get('todos').size, todos.size - 1, 'removes one item')
      t.equal(s.get('todos').indexOf(todo), -1, 'cannot find todo anymore')
    }, state, todo)
  })

  t.test('edit()', t => {
    t.plan(1)

    var todo = todos.first()

    actions.edit(s => {
      t.equal(s.get('editing'), todo.get('id'), 'edits the right todo')
    }, state, todo)
  })

  t.test('stopEditing()', t => {
    t.plan(1)

    actions.stopEditing(s => {
      t.equal(s.get('editing'), null, 'editing is null')
    }, state)
  })

  t.test('update()', t => {
    t.plan(3)

    var title = 'I love updating!'
    var todo = todos.first()

    actions.update.call({
      stopEditing () {
        t.ok(true, 'calls stopEditing')
      }
    }, s => {
      t.equal(s.get('todos').indexOf(todo), -1, 'cannot find todo anymore')
      t.equal(s.get('todos').first().get('title'), title, 'new title')
    }, state, todo, title)
  })

  t.test('toggle()', t => {
    t.plan(2)

    var todo = todos.last()

    actions.toggle(s => {
      t.equal(s.get('todos').indexOf(todo), -1, 'cannot find todo anymore')
      t.equal(s.get('todos').last().get('completed'), !todo.get('completed'), '`completed` was toggled')
    }, state, todo)
  })

  t.test('toggleAll()', t => {
    t.plan(2)

    actions.toggleAll(s => {
      t.equal(countCompleted(s), 0, 'none are completed')
    }, state, false)

    actions.toggleAll(s => {
      t.equal(countCompleted(s), todos.size, 'all are completed')
    }, state, true)
  })

  t.test('clearCompleted()', t => {
    t.plan(2)

    actions.clearCompleted(s => {
      t.equal(s.get('todos').size, 2, 'one todo is gone')
      t.equal(countCompleted(s), 0, 'no completed left')
    }, state)
  })

})

var countCompleted = s => s.get('todos').filter(todo => todo.get('completed')).size
