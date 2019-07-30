import fs from 'fs';
import express from 'express';
import http from 'http';
import https from 'https';
import bodyParser from 'body-parser';
import path from 'path';
import mustacheExpress from 'mustache-express';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';

var config = require('./config/mongo.js');

const app = express();
const MongoStore=require('connect-mongo')(session);

//security suite middleware
app.use(helmet());

//Passport config
require('./passport')(passport);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set("views", path.resolve("dist"));

app.use(express.static("dist"));
app.use('/images', express.static("public/images"));

//session middleware
app.use(
    session({
      secret: config.PASSPORT_KEY || 'secretkey',
      name: 'encoresesssionid',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection}),
      cookie: {
        secure: process.env.PROD == 'true' ? true : false,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    })
);

//authentication middleware
app.use(passport.initialize());
app.use(passport.session());

let routes = require('./routes');
app.use(routes);

const httpApp = app;

if( process.env.PROD == 'true' ){
  httpApp.get("*", function (req, res, next) { //redirect to https equivilant page
    res.redirect("https://" + req.headers.host + "/" + req.path);   
  });
}

http.createServer(httpApp).listen(8080, () => console.log("Listening on port 8080!"));

if( process.env.PROD == 'true' ){
	let privateKey = fs.readFileSync('src/server/config/keys/privateKey.key');
	let certificate = fs.readFileSync('src/server/config/keys/certificate.crt');

	https.createServer({
	    key: privateKey,
	    cert: certificate
	}, app).listen(8081, () => console.log("Listening on port 8081!"));
}