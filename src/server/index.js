require('@babel/register')({
  
})

//access environmental variables
require('dotenv').config();

//var config = require('./config/mongo.js');
const mongoose = require('mongoose');

/*var mongooseOptions = {
	useNewUrlParser: true
}*/

mongoose.set('useCreateIndex', true);

/*if( config.AUTH === true ){
	mongooseOptions.user = config.APP_USERNAME;
	mongooseOptions.pass = config.APP_PASSWORD;
}*/

mongoose.connect(`mongodb://localhost:27017/encoreTest`);

module.exports = require('./server.js')