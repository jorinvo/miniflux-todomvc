import React from 'react'
import HashHistory from 'react-router/lib/HashHistory'
import {Router} from 'react-router'
import routes from './routes'

React.render(
  <Router history={new HashHistory()} >
    {routes}
  </Router>,
  document.getElementsByClassName('todoapp')[0]
)
