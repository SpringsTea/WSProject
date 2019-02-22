const router = require('express').Router();
const services = require('./api/services');

// api endpoints
router.get('/api/serieslist', services.GetSeriesList);
router.get('/api/series/:id/cards', services.GetSeriesCards);
router.get('/api/deck/:deckid', services.GetDeckById);
router.get('/api/search/deck', services.SearchDecks);
router.post('/api/deck', services.SaveDeck);
// ui endpoints
router.get('/deck/:deckid', services.RenderDeck);
router.get('/decks', services.RenderDeckSearch);

module.exports = router;
