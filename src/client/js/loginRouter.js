/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';

// React components
import Header from './components/Header/Header';
import Login from './components/Login/Login';

// Styles
import '../styles/styles.less';
import '../styles/login.less';

// Export the globals we'll want elsewhere
window.WS = Object.assign(window.WS || {}, {
  event: new EventEmitter(),
});

// Pull from our global namespace
const { WS } = window;

const domLoaded = new Promise(res =>
  document.addEventListener('DOMContentLoaded', () => {
    res(document);
  }),
);

// Route via events
WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header />, document.querySelector(props.el));
});

WS.event.on('login.load', async props => {
  await domLoaded;

  render( <Login />, document.querySelector(props.el));
})