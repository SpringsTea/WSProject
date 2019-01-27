import mongoose from 'mongoose'

import { Serieses } from './stubs/Serieses'
import { Konosuba } from './stubs/Series'

import Card from './api/models/card'

module.exports = function(app){

  app.post("/api/test", (req,res) => {

  	const card = new Card({
  		_id: new mongoose.Types.ObjectId(),
  		name: req.body.name
  	});

  	card.save().then(result => {
  		//console.log(result)
  	})
  	.catch( err => console.log(err) );
  	res.status(201).json({
  		message: "/test",
  		createdCArd: card
  	})

  })

  app.get("/api/test", (req, res) =>
    res.send({ test: 'success' })
  );

  app.get("/api/serieslist", (req, res) =>
    res.send(Serieses)
  );

  app.get("/api/series", (req, res) => 
    res.send(Konosuba)
  );
    
}