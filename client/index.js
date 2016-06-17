import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import shareApp from './reducers'
import App from './components/App'

// let store = createStore(shareApp);

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// )

render(
  <App />, 
  document.getElementById('app')
)