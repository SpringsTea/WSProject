let router = require('express').Router();
let services = require('./api/services');

// api endpoints
router.get("/api/serieslist/:lang?", services.GetSeriesList);
router.get("/api/series/:id/cards", services.GetSeriesCards);
router.get("/api/deck/:deckid", services.GetDeckById);
router.post("/api/deck/claim/:deckid", services.ClaimDeck);
router.get("/api/search/deck", services.SearchDecks);
router.post("/api/deck", services.NewDeck);
router.get("/api/fixdecks", services.FixDecks);

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
router.get("/builder", services.RenderDeckBuilder);
router.get("/login", services.RenderLogin);
router.get("/user/:username?", services.RenderUser);
router.get("*", services.RenderPageNotFound);


module.exports = router;