const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mustacheExpress = require('mustache-express');
const passport = require('passport');

const app = express();

//enable environmental variables
require('dotenv').config();

//Passport config
require('./passport')(passport);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register '.mustache' extension with The Mustache Express
/*app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set("views", path.resolve("dist"));

app.use(express.static("dist"));
app.use('/images', express.static("public/images"));*/

//authentication middleware
app.use(passport.initialize());

let routes = require('./routes');
app.use(routes);

app.listen(8080, () => console.log("Listening on port 8080!"));