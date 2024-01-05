/* global window document */

import EventEmitter from 'events';
import React from 'react';
import { render } from 'react-dom';
import { ConfigProvider, theme } from 'antd';

import {
  receiveSerieses,
  receiveDeck,
} from './actions/BuilderActions';

import {
  fetchSerieses,
  fetchDeck
} from './utils/api'

// React components
import Builder from './components/Builder/Builder';
import Header from './components/Header/Header';

// Styles
import '../styles/styles.less'
import '../styles/builder.less'

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
  loadBuilderData(props)
  await domLoaded;
  render(
    <ConfigProvider
      theme={{
        algorithm: props.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <Builder {...props} />
    </ConfigProvider>

    , document.querySelector(props.el));
});

WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header {...props} />, document.querySelector(props.el));
})

async function loadBuilderData(data={}) {

  const promises = [];

  promises.push(fetchSerieses('EN'));

  if( data.mode && data.deckid ){//for editing and forking, load the deck without populating cards
    promises.push(fetchDeck(data.deckid))
  }

  const [
    serieses,
    deck
  ] = await Promise.all(promises);
  
  receiveSerieses(serieses);

  if( deck ){
    receiveDeck(deck);
  }
  
}