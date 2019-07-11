// import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Footer } = Layout;
import Login from 'src/views/Login';
import Register from 'src/views/Register';

const AuthLayout = () => (
  <div>
    <Header></Header>
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Redirect to="/auth/login" />
    </Switch>
    <Footer style={{ textAlign: 'center' }}>
      React_antd ©2019 Created by 曉宸
    </Footer>
  </div>
);

export default AuthLayout;
