require('@babel/register')({
  
})

var config = require('./config/mongo.js');
const mongoose = require('mongoose');

var mongooseOptions = {
	useNewUrlParser: true
}

mongoose.set('useCreateIndex', true);

if( config.AUTH === true ){
	mongooseOptions.user = config.APP_USERNAME;
	mongooseOptions.pass = config.APP_PASSWORD;
}


mongoose.connect(process.env.CONNECTION, mongooseOptions);

module.exports = require('./server.js')