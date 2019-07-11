// import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Home from 'src/views/Home';
import Idea from 'src/views/Idea';
import Article from 'src/views/Article';

const BasicLayout = ({ match }) => (
  <div>
    <nav>
      <NavLink to={`${match.path}`}>首页</NavLink>
      <NavLink to={`${match.path}/article`}>文章</NavLink>
      <NavLink to={`${match.path}/idea`}> 想法</NavLink>
    </nav>
    <main>
      <Switch>
        <Route path={`${match.path}`} exact component={Home} />
        <Route path={`${match.path}/article`} component={Article} />
        <Route path={`${match.path}/idea`} component={Idea} />
        <Redirect to={`${match.url}`} />
      </Switch>
    </main>
  </div>
);

export default BasicLayout;
