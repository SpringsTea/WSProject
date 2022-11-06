
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

TODO. But you need to do this to actually use the app locally.

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
