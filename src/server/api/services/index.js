"use strict";

module.exports = {
    GetSeriesList: require('./getserieslist'),
    GetSeriesCards: require('./getseriescards'),
    GetDeckById: require('./getdeckbyid'),
    SearchDecks: require('./searchdecks'),
    SaveDeck: require('./savedeck'),
    RegisterUser: require('./registeruser'),
    RenderDeck: require('./renderdeck'),
    RenderDeckSearch: require('./renderdecksearch'),
    RenderDeckBuilder: require('./renderdeckbuilder'),
    PasswordReset : require('./resetpassword'),
    SetNewPassword : require ('./newpassword'),
    Login: require('./login'),
    Auth: require('./auth'),
    VerifyEmail: require('./verify')
}