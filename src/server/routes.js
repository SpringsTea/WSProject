let router = require('express').Router();
let services = require('./api/services');

// api endpoints
router.get("/api/serieslist", services.GetSeriesList);
router.get("/api/series/:id/cards", services.GetSeriesCards);
router.get("/api/deck/:deckid", services.GetDeckById);
router.get("/api/search/deck", services.SearchDecks);
router.get("/api/verify/:token", services.VerifyEmail);
router.post("/api/login", services.Login);
router.post("/api/reset",services.PasswordReset);
router.post("/api/reset/:token", services.SetNewPassword);
router.post("/api/register", services.RegisterUser);
router.post("/api/deck", services.SaveDeck);

// ui endpoints
router.get("/", services.RenderDeckSearch);
router.get("/deck/:deckid", services.RenderDeck);
router.get("/builder", services.RenderDeckBuilder);


module.exports = router;