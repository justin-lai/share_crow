import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App';
import Profile from './components/Profile';
import Marketplace from './components/Marketplace';
import PublicUserProfile from './components/PublicUserProfile';
import ReceiveRequest from './components/ReceiveRequest';

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
      <Route path="/public-user-profile" component={PublicUserProfile} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/receive-request" component={ReceiveRequest} />
    </Router>
  </Provider>),
  document.getElementById('app')
);
