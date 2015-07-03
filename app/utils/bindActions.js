export default function bindActions (actions, render, initialState) {
  var state = initialState

  function update (updatedState) {
    state = updatedState
    render(state)
  }

  var boundActions = Object.keys(actions).reduce(function (o, name) {
    o[name] = function () {
      if (process.env.NODE_ENV !== 'production') {
        console.info(`ACTION: "${name}"`)
      }
      actions[name].call(o, update, state, ...arguments)
    }
    return o
  }, {})

  if (process.env.NODE_ENV !== 'production') {
    window.actions = boundActions
    window.render = render
    window.state = state
  }

  return boundActions
}
