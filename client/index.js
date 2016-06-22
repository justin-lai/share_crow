import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App';
import Profile from './components/Profile';

require('./assets/styles.scss');
// require('./assets/darthvader.jpg');
// require('file?name=[name].[ext]!./darthvader.jpg');


let store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  (<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/profile" component={Profile} />
    </Router>
  </Provider>),
  document.getElementById('app')
);
