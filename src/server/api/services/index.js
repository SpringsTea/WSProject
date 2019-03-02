"use strict";

module.exports = {
    GetSeriesList: require('./getserieslist'),
    GetSeriesCards: require('./getseriescards'),
    GetDeckById: require('./getdeckbyid'),
    SearchDecks: require('./searchdecks'),
    SaveDeck: require('./savedeck'),
    RenderDeck: require('./pages/renderdeck'),
    RenderDeckSearch: require('./pages/renderdecksearch'),
    RenderDeckBuilder: require('./pages/renderdeckbuilder'),
    RenderPageNotFound: require('./pages/renderpagenotfound')
}