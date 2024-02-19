/* global window document */

import EventEmitter from 'events';
import React from 'react';
import { render } from 'react-dom';
import queryString from 'query-string';
import { ConfigProvider, theme } from 'antd';

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

const qs = queryString.parse(location.search);

// Route via events
WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header {...props} />, document.querySelector(props.el));
})

WS.event.on('decksearch.load', async props => {
  await loadDeckSearchData();
  await domLoaded;

  render( 
    <ConfigProvider
      theme={{
        algorithm: props.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <DeckSearch loggedin={props.loggedin} filters={qs} theme={props.theme} />
    </ConfigProvider>
    , document.querySelector(props.el));
})

async function loadDeckSearchData() {

  const [
    decks,
    serieses,
    neosets,
  ] = await Promise.all([
    searchDeck(qs),
    fetchSerieses(),
    fetchNeoSets()
  ]);

  receiveDecks(decks)
  receiveSerieses(serieses);
  receiveNeoSets(neosets);
}