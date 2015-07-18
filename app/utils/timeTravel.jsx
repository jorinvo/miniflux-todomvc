import React, { PropTypes } from 'react'

var isPreview = false
var element = document.body.appendChild(document.createElement('div'))

export default function travelTime (render, state) {

  // Global to not overwrite states on hot-load
  if (!window.states) window.states = []

  var last = window.states[window.states.length - 1]
  if (!isPreview && state !== last) {
    window.states.push(state)
  }

  function select (newState) {
    isPreview = false
    render(newState)
  }

  function preview (newState) {
    isPreview = true
    render(newState)
  }

  function stopPreview () {
    isPreview = false
    render(window.states[window.states.length - 1])
  }

  function clear () {
    window.states = []
    render(state)
  }

  React.render(
    <TimeTraveller
      states={window.states.slice(0, -1)}
      onSelect={select}
      onEnter={preview}
      onLeave={stopPreview}
      onClear={clear}
    />,
    element
  )

}

const height = '25px'
const color = '#334FE0'
const bgColor = 'white'

const wrapperStyle = {
  position: 'absolute',
  top: 0, left: 0,
  width: '100%',
  zIndex: 999999,
  background: bgColor,
  opacity: 0.7
}

const buttonStyle = {
  position: 'absolute',
  right: 0,
  height: height,
  padding: '0 7px',
  color: bgColor, background: color,
  fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px',
  cursor: 'pointer'
}

const listStyle = {
  height: height,
  margin: 0, padding: 0
}

const itemStyle = {
  float: 'left',
  height: height, width: '10px',
  listStyle: 'none',
  borderRight: `1px solid ${bgColor}`,
  background: color,
  cursor: 'pointer'
}

var TimeTraveller = React.createClass({

  propTypes: {
    states: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired
  },

  render () {
    if (!this.props.states.length) return this.renderEmpty()

    return (
      <div style={wrapperStyle}>
        <button style={buttonStyle} onClick={this.props.onClear}>
          Clear
        </button>
        <ul style={listStyle}>
          {this.props.states.map((state, i) => (
            <li
              key={i}
              style={itemStyle}
              onClick={this.props.onSelect.bind(null, state)}
              onMouseEnter={this.props.onEnter.bind(null, state)}
              onMouseLeave={this.props.onLeave}
            ></li>
          ))}
        </ul>
      </div>
    )
  },

  renderEmpty () {
    return <div></div>
  }

})
