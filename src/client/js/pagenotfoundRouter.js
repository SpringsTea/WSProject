/* global window document */

import EventEmitter from 'events';
import React from 'react';
import { render } from 'react-dom';

// React components
import Header from './components/Header/Header';
import PageNotFound from './components/PageNotFound/PageNotFound';
// Styles
import '../styles/styles.less';
import '../styles/pagenotfound.less';

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
  render(<Header loggedin={props.loggedin} />, document.querySelector(props.el));
});

WS.event.on('pagenotfound.load', async props => {
  await domLoaded;

  render( <PageNotFound />, document.querySelector(props.el));
})