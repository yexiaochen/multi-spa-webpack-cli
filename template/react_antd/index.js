import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const root = document.getElementById('app');
const render = Component => ReactDOM.render(<Component />, root);

render(App);

if (module.hot) {
  module.hot.accept('./app.js', () => {
    render(App);
  });
}
