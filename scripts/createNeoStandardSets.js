const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../src/server/api/models';

const neoSetModel = require(`${MODEL_PATH}/neoset`)
const neomap = require('../src/server/api/mappings/neo-standard-map');

var mongooseOptions = {
  useNewUrlParser: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

console.log('connecting to mongoose...')
mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');

const neoarr = Object.keys(neomap);

neoarr.forEach( (key) => {

	let neoset = {
		name: key,
		setcodes: neomap[key],
		enabled: true,
		hash: new ObjectId()
	}

	neoSetModel.create(neoset, function(err, data){
        if(err){
          console.log('Something went wrong', err);
        }
        else{
          console.log('neoset added:', key);
        }
      })

})