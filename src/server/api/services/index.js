"use strict";

module.exports = {
    GetSeriesList: require('./getserieslist'),
    GetSeriesCards: require('./getseriescards'),
    GetDeckById: require('./getdeckbyid'),
    SearchDecks: require('./searchdecks'),
    NewDeck: require('./newdeck'),
    FixDecks: require('./fixdecks'),
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