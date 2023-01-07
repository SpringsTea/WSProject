
<p align="center"><a href="https://www.encoredecks.com" target="_blank" rel="noopener noreferrer"><img width="200" src="https://www.encoredecks.com/images/assets/Clappy_240.png" alt="Encore logo"></a></p>

<h2 align="center">Encore Decks</h2>

[encoredecks.com](https://encoredecks.com) is an open source database and deck building application for the popular TCG [Weiss Schwarz](https://en.ws-tcg.com/), created by **Bushiroad Inc.** I created this project for the benefit of the Weiss Schwarz community, and not with the intent of monetary gain.

Join our <a href="https://discord.gg/cFsZJCq"> Discord <img width="50" src="https://discordapp.com/assets/2c21aeda16de354ba5334551a883b481.png" alt="Encore logo"> </a> to contribute to site development, card translations, or to get updates.
@ me @SpeedOfRound#9530

## Development

### Getting Started

* Have Node >=16
* `npm i`

### Setting Up Mongo

Create `src/server/config/mongo.js` with the following:

```js
export default {
  AUTH: true|false,
  APP_USERNAME: 'yourdbusername',
  APP_PASSWORD: 'yourdbpassword'
}
```

### Running The App

* `npm run dev`
* Open your browser to `localhost:8080`

### Getting Card Data

Scripts are located in the `./scripts` directory. This is where you should run the following commands from.

English cards can be added by putting files from [WeissSchwarz-ENG-DB](https://github.com/CCondeluci/WeissSchwarz-ENG-DB) into `./scripts/SetData/EN` and running the command `FILE={filename.json} ENCardPatch` 

JP cards can be added by taking files from [wsoffdata](https://github.com/Akenaide/wsoffdata) and putting them into `./scritps/Cards/NP`. Then run the following commnads in order: 

- `SERIES={AOT} LOCALE=NP node ConvertWSSCards` (this one converts all cards from a series into single files)
- `FILE={filename.json} LOCALE=NP node JPCardPatch` (filename being the single file that the previous command created into `./scripts/SetData/NP`)

All JP files use NP as their locale as a byproduct of a time where the JP locale was actually english translated JP cards. NP = Nippon

### Email

Encore uses gmail for sending registration, password reset and logging emails
To setup with your own gmail account, keys must be set in a `.env` file in the root directory

```
SERVICE=gmail
MAILER=encoredecks@gmail.com
MAIL_PW=...
MAIL_CLIENTID=...
MAIL_OAUTHSECRET=...
MAIL_REFRESHTOKEN=...
```

### Notes

You can't download PDFs if you're on windows [due to lacking support from this library](https://github.com/tpisto/pdf-fill-form). The app will otherwise work.

If this isn't working for you on a supported platform, you might need to `npm i pdf-fill-form`.

## Roadmap

There is a [Trello](https://trello.com/b/eQnnH19k/encoredecks) that is kept up to date with what things are planned and need to be worked on.

## How can I help?

Since encoredecks is open source, that means any one can help, just open a pull request! You can work any things in the roadmap above, or something you think adds value (Talk to me first).

Non programmers can help with the following:

 - Card translations (@BoatsDon'tSink for details)
 - Site design or ideas
