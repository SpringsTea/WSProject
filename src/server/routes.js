let router = require('express').Router();
let services = require('./api/services');

// api endpoints
router.get("/api/serieslist/:lang?", services.GetSeriesList);
router.get("/api/series/:id/cards", services.GetSeriesCards);
router.get("/api/neosets", services.GetNeoSetList);
router.post("/api/deck", services.SaveDeck);
router.post("/api/deck/favorite/:deckid", services.FavoriteDeck);
router.get("/api/search/deck", services.SearchDecks);
router.get("/api/deck/:deckid", services.GetDeckById);
router.delete("/api/deck/:deckid", services.DeleteDeck);
//router.post("/api/deck/claim/:deckid", services.ClaimDeck);
//router.get("/api/fixdecks", services.FixDecks);
router.post("/api/translations/:seriesid", services.SaveTranslations);

// auth endpoints
router.get("/api/verify/:token", services.VerifyEmail);
router.post("/api/login", services.Login, (req, res) => {res.json({ success: true, message: 'sucessfully logged in'})});
router.post("/api/logout", services.Logout);
router.post("/api/reset",services.PasswordReset);
router.post("/api/reset/:token", services.SetNewPassword);
router.post("/api/register", services.RegisterUser);

// ui endpoints
router.get("/", services.RenderDeckSearch);
router.get("/deck/:deckid", services.RenderDeck);
router.get("/builder/:mode?/:deckid?", services.RenderDeckBuilder);
router.get("/login/:tab?/:token?", services.RenderLogin);
router.get("/user/:username?", services.RenderUser);
router.get("/translations", services.RenderTranslations);
router.get("*", services.RenderPageNotFound);


module.exports = router;