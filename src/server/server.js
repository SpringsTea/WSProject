import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mustacheExpress from 'mustache-express';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';

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
      secret: process.env.SECRET_KEY,
      name: 'encoresesssionid',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
);

//authentication middleware
app.use(passport.initialize());
app.use(passport.session());

let routes = require('./routes');
app.use(routes);

app.listen(8080, () => console.log("Listening on port 8080!"));