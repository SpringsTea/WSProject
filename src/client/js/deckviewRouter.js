/* global window document */

import EventEmitter from 'events';
import React from 'react';
import { render } from 'react-dom';
import { ConfigProvider, theme } from 'antd';

import {
  receiveDeck,
} from './actions/DeckActions';

import {
	fetchDeck,
} from './utils/api'

// React components
import Header from './components/Header/Header';
import DeckView from './components/DeckView/DeckView';

// Styles
import '../styles/styles.less'
import '../styles/deckview.less'

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
  render(<Header {...props} />, document.querySelector(props.el));
})

WS.event.on('deckview.load', async props => {
  await Promise.all([ loadDeckViewData({deckid: props.deckid}), domLoaded ]);
  render( 
    <ConfigProvider
      theme={{
        algorithm: props.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <DeckView loggedin={props.loggedin} userid={props.userid} theme={props.theme} />
    </ConfigProvider>
      , document.querySelector(props.el)
  );
})

async function loadDeckViewData(data){
  const [
    deck,
  ] = await Promise.all([
    fetchDeck(data.deckid),
  ]);

  receiveDeck(deck);

}