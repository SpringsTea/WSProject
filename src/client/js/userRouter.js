/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';

import {
  receiveDecks,
  receiveSerieses,
} from './actions/DeckSearchActions';

import {
  fetchSerieses,
  searchDeck,
} from './utils/api'

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

async function loadUserDecks(userid = true) {
  const [
    decks,
    serieses,
  ] = await Promise.all([
    searchDeck({userid: userid}),
    fetchSerieses()
  ]);

  receiveDecks(decks)
  receiveSerieses(serieses);
}

// Route via events
WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header loggedin={props.loggedin}/>, document.querySelector(props.el));
});

WS.event.on('user.load', async props => {
  await loadUserDecks();
  await domLoaded;
  render( <User username={props.username} />, document.querySelector(props.el));
})