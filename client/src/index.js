import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'


import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import App from './components/app';
import Welcome from './components/welcome';
import Header from './components/header'
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const history = createHistory()
const browserHistory = routerMiddleware(history)

const createStoreWithMiddleware = applyMiddleware(reduxThunk, browserHistory)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
  	<ConnectedRouter history={history}>
      <div>
        <Header />
        <Switch> 
          <Route path='/signin' component={Signin} /> 
          <Route path='/signup' component={Signup} /> 
          <Route path='/signout' component={Signout} />
          <Route path='/app' component={App} />
          <Route path='/' component={Welcome} />
        </Switch>        
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));