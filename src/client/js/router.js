/* global window document */

import EventEmitter from 'events';
import React from 'react';
import { render } from 'react-dom';
//import { Router, Route, browserHistory } from 'react-router';

import {
  receiveSerieses,
} from './actions/BuilderActions';

import {
  receiveDeck,
} from './actions/DeckActions';

import {
  receiveDecks
} from './actions/DeckSearchActions';

import {
	fetchDeck,
  fetchSerieses,
  searchDeck,
} from './utils/api'

// React components
import Builder from './components/Builder/Builder';
import Header from './components/Header/Header';
import DeckView from './components/DeckView/DeckView';
import DeckSearch from './components/DeckSearch/DeckSearch';

// Styles
import '../styles/styles.less'
import '../styles/builder.less'
import '../styles/deckview.less'
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
WS.event.on('page.app.load', async props => {
  loadBuilderData()
  await domLoaded;
  render(<Builder {...props} />, document.querySelector(props.el));
});

WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header />, document.querySelector(props.el));
})

WS.event.on('deckview.load', async props => {
  await Promise.all([ loadDeckViewData({deckid: props.deckid}), domLoaded ]);

  render( <DeckView />, document.querySelector(props.el));
})

WS.event.on('decksearch.load', async props => {
  loadDeckSearchData();
  render( <DeckSearch />, document.querySelector(props.el));
})

async function loadBuilderData() {
  const [
    serieses,
  ] = await Promise.all([
    fetchSerieses(),
  ]);

  receiveSerieses(serieses);
}

async function loadDeckViewData(data){
  const [
    deck,
  ] = await Promise.all([
    fetchDeck(data.deckid),
  ]);

  receiveDeck(deck);

}

async function loadDeckSearchData() {
  const [
    decks
  ] = await Promise.all([
    searchDeck({})
  ]);

  receiveDecks(decks)
}