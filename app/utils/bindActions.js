// This let's us call the actions without
// specifing `render` and `state` every time.
// All other arguments are forwarded to the action.
// We can also call other actions from an action via `this.otherAction()`.
//
// This also logs the actions to the console in development mode
// and provides you `actions`, `state` and `render` as global utilities.
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
    window.state = state
    window.render = render
  }

  return boundActions
}
