// import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Authorized from 'src/AuthorizedRoute';
import AuthLayout from 'src/layouts/AuthLayout';
import BasicLayout from 'src/layouts/BasicLayout';
// import UserLayout from 'src/layouts/UserLayout';
import PersonalView from 'src/views/Personal';
import rootReducer from 'src/store';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/home" component={BasicLayout} />
        <Authorized path="/user" component={PersonalView} />
        <Redirect to="/auth" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
