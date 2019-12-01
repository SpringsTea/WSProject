/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';
import queryString from 'query-string';

import {
  receiveSerieses
} from './actions/BuilderActions';

import {
  fetchSerieses
} from './utils/api'

// React components
import Header from './components/Header/Header';
import Translations from './components/Translations/Translations';
// Styles
import '../styles/styles.less';
import '../styles/translations.less';
import '../styles/builder.less';

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

async function loadTranslationData(data={}) {

  const [
    serieses
  ] = await Promise.all([
    fetchSerieses('JP')
  ]);
  
  receiveSerieses(serieses);  
}


// Route via events
WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header loggedin={props.loggedin} title={props.title}/>, document.querySelector(props.el));
});

WS.event.on('translations.load', async props => {
  await loadTranslationData();
  await domLoaded;
  render( <Translations loggedin={props.loggedin}/>, document.querySelector(props.el));
})