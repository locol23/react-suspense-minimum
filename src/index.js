import React, { unstable_AsyncMode as AsyncMode } from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(
  <AsyncMode>
    <App />
  </AsyncMode>,
  document.getElementById('app')
)
