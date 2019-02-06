require('@babel/register')({
  
})

var config = require('./config/mongo.js')
const mongoose = require('mongoose')

var mongooseOptions = {
	useNewUrlParser: true
}

if( config.AUTH === true ){
	mongooseOptions.user = config.APP_USERNAME;
	mongooseOptions.pass = config.APP_PASSWORD;
}


mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);

module.exports = require('./server.js')