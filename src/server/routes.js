let router = require('express').Router();
let services = require('./api/services');

// api endpoints
router.get("/api/serieslist/:lang", services.GetSeriesList);
router.get("/api/series/:id/cards", services.GetSeriesCards);
router.get("/api/deck/:deckid", services.GetDeckById);
router.get("/api/search/deck", services.SearchDecks)
router.post("/api/deck", services.SaveDeck);
// ui endpoints
router.get("/", services.RenderDeckSearch);
router.get("/deck/:deckid", services.RenderDeck);
router.get("/builder", services.RenderDeckBuilder);
router.get("*", services.RenderPageNotFound);


module.exports = router;