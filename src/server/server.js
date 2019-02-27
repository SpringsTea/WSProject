import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mustacheExpress from 'mustache-express';

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set("views", path.resolve("dist"));

app.use(express.static("dist"));
app.use('/images', express.static("public/images"));

let routes = require('./routes');
app.use(routes);

app.listen(8080, () => console.log("Listening on port 8080!"));