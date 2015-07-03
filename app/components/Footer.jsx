import React, {PropTypes} from 'react'
import {pluralize} from '../utils/helpers'
import {Link} from 'react-router'

export default React.createClass({

  propTypes: {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    count: PropTypes.number.isRequired,
    completedCount: PropTypes.number,
    showAll: PropTypes.bool
  },

  render () {
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{this.props.count}</strong>
          {` ${pluralize(this.props.count, 'item')} left`}
        </span>
        <ul className='filters'>
          <li>
            <Link to='/' activeClassName={this.props.showAll ? 'selected' : ''}>
              All
            </Link>
          </li>
          {' '}
          <li>
            <Link to='/active' activeClassName='selected'>
              Active
            </Link>
          </li>
          {' '}
          <li>
            <Link to='/completed' activeClassName='selected'>
              Completed
            </Link>
          </li>
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  },

  renderClearButton () {
    if (!this.props.completedCount) return

    return (
      <button className='clear-completed' onClick={this.props.actions.clearCompleted}>
        Clear completed
      </button>
    )
  }

})
