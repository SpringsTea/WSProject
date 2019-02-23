/* global window document */

import EventEmitter from 'events';
import React from 'react';
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
import DeckSearch from './components/DeckSearch/DeckSearch';

// Styles
import '../styles/styles.less'
import '../styles/decksearch.less'

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
})

WS.event.on('decksearch.load', async props => {
  loadDeckSearchData();
  render( <DeckSearch />, document.querySelector(props.el));
})

async function loadDeckSearchData() {
  const [
    decks,
    serieses,
  ] = await Promise.all([
    searchDeck({}),
    fetchSerieses()
  ]);

  receiveDecks(decks)
  receiveSerieses(serieses);
}