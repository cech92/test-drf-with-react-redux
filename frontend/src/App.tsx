
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { store, history } from './helpers';
import { Provider } from 'react-redux';

export const App = hot(module)(() => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute component={Layout} />
      </Switch>
    </Router>
  </Provider>
));

export default App;
