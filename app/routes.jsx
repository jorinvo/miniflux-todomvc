import React from 'react'
import { Route } from 'react-router'

import Main from './components/Main'
import App from './components/App'

// We need to specify the route handler twice
// to catch the case without option specified
export default (
  <Route component={Main}>
    <Route path='/' component={App} />
    <Route path='/:option' component={App} />
  </Route>
)
