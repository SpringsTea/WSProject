/* global window document */

import EventEmitter from 'events';
import { render } from 'react-dom';
import queryString from 'query-string';
import { ConfigProvider, theme } from 'antd';

import {
  receiveDecks,
  receiveSerieses,
  receiveNeoSets,
} from './actions/DeckSearchActions';

import {
  receiveUser
} from './actions/UserActions';

import {
  fetchSerieses,
  fetchNeoSets,
  searchDeck,
  fetchUserData,
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

async function loadUserData(userid){
  const user = await fetchUserData(userid);
  receiveUser(user);
}

// Route via events
WS.event.on('page.header', async props => {
  await domLoaded;
  render(<Header {...props} />, document.querySelector(props.el));
});

WS.event.on('user.load', async props => {

  await Promise.all([
    loadUserDecks(props.username),
    loadUserData(props.userid)
  ])
  await domLoaded;
  render( 
    <ConfigProvider
      theme={{
        algorithm: props.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <User loggedin={props.loggedin} filters={qs} username={props.username} theme={props.theme} />
    </ConfigProvider>

    , document.querySelector(props.el));
})