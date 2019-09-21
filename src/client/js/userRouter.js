/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';
import queryString from 'query-string';

import {
  receiveDecks,
  receiveSerieses,
  receiveNeoSets,
} from './actions/DeckSearchActions';

import {
  fetchSerieses,
  fetchNeoSets,
  searchDeck,
} from './utils/api'

// React components
import Header from './components/Header/Header';
import User from './components/User/User';

// Styles
import '../styles/styles.less';
import '../styles/decksearch.less';
import '../styles/user.less';

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

const qs = queryString.parse(location.search);

async function loadUserDecks(username = true) {
  const [
    decks,
    serieses,
    neosets,
  ] = await Promise.all([
    searchDeck({username: username, invalid:true, ...qs}),
    fetchSerieses(),
    fetchNeoSets()
  ]);

  receiveDecks(decks);
  receiveSerieses(serieses);
  receiveNeoSets(neosets);
}

// Route via events
WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header loggedin={props.loggedin} title={props.title}/>, document.querySelector(props.el));
});

WS.event.on('user.load', async props => {
  await loadUserDecks(props.username);
  await domLoaded;
  render( <User filters={qs} username={props.username} />, document.querySelector(props.el));
})