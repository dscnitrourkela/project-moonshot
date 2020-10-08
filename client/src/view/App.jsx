import React from 'react';
import Hello from './Hello';

// Libraries
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import createBrowserHistory from '../helpers/history';

function App() {
  return (
    <Router history={createBrowserHistory}>
      <Switch>
        <Route path='/' exact component={Hello} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
