"use strict";

module.exports = {
    GetSeriesList: require('./getserieslist'),
    GetSeriesCards: require('./getseriescards'),
    GetDeckById: require('./getdeckbyid'),
    SearchDecks: require('./searchdecks'),
    NewDeck: require('./newdeck'),
    FixDecks: require('./fixdecks'),
    RenderDeck: require('./pages/renderdeck'),
    RenderDeckSearch: require('./pages/renderdecksearch'),
    RenderDeckBuilder: require('./pages/renderdeckbuilder'),
    RenderPageNotFound: require('./pages/renderpagenotfound'),
    RegisterUser: require('./auth/registeruser'),
    PasswordReset : require('./auth/resetpassword'),
    SetNewPassword : require ('./auth/newpassword'),
    Login: require('./auth/login'),
    Auth: require('./auth/auth'),
    VerifyEmail: require('./auth/verify')
}