import express from 'express';
import bodyParser from 'body-parser'

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

require('./routes.js')(app);

app.listen(8080, () => console.log("Listening on port 8080!"));