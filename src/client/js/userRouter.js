/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';

// React components
import Header from './components/Header/Header';
import User from './components/User/User';

// Styles
import '../styles/styles.less';

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

WS.event.on('user.load', async props => {
  await domLoaded;

  render( <User />, document.querySelector(props.el));
})