/* global window document */

import EventEmitter from 'events';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import {
  receiveTestData,
  receiveSerieses,
} from './actions/BuilderActions';

import {
	fetchTestData,
  fetchSerieses,
} from './utils/api'

// React components
import Builder from './components/Builder/Builder';

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
  loadBuilderData()
  await domLoaded;
  render(<Builder {...props} />, document.querySelector(props.el));
});

async function loadBuilderData() {
  const [
    testdata,
    serieses,
  ] = await Promise.all([
    fetchTestData(),
    fetchSerieses(),
  ]);

  receiveTestData(testdata);
  receiveSerieses(serieses);
}