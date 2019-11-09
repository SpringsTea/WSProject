/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';
import queryString from 'query-string';

// React components
import Header from './components/Header/Header';

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
  render(<Header loggedin={props.loggedin} title={props.title}/>, document.querySelector(props.el));
});

WS.event.on('user.load', async props => {
  await loadUserDecks(props.username);
  await domLoaded;
  render( <User loggedin={props.loggedin} filters={qs} username={props.username} />, document.querySelector(props.el));
})