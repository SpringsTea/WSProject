"use strict";

module.exports = {
    GetSeriesList: require('./getserieslist'),
    GetNeoSetList: require('./getneosetlist'),
    GetSeriesCards: require('./getseriescards'),
    GetDeckById: require('./getdeckbyid'),
    SearchDecks: require('./searchdecks'),
    SaveDeck: require('./savedeck'),
    FixDecks: require('./fixdecks'),
    ClaimDeck: require('./claimdeck'),
    DeleteDeck: require('./deletedeck'),
    ///////Auth//////
    RegisterUser: require('./auth/registeruser'),
    PasswordReset : require('./auth/resetpassword'),
    SetNewPassword : require ('./auth/newpassword'),
    Login: require('./auth/login'),
    Logout: require('./auth/logout'),
    Auth: require('./auth/auth'),
    VerifyEmail: require('./auth/verify'),
    //////Pages//////
    RenderDeck: require('./pages/renderdeck'),
    RenderDeckSearch: require('./pages/renderdecksearch'),
    RenderDeckBuilder: require('./pages/renderdeckbuilder'),
    RenderLogin: require('./pages/renderlogin'),
    RenderUser: require('./pages/renderuser'),
    RenderPageNotFound: require('./pages/renderpagenotfound'),
}