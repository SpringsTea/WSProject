import mongoose from 'mongoose'

//import { Serieses } from './stubs/Serieses'
import { Konosuba } from './stubs/Series'

import Card from './api/models/card'
import Series from './api/models/series'

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
  		createdCard: card
  	})

  })

  app.get("/api/test", (req, res) =>
    res.send({ test: 'success' })
  );

  app.get("/api/serieslist", (req, res) =>{
    Series.find().exec()
    .then( docs => {
      console.log('Series list requested');
      res.status(200).json(docs)
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: 'something went wrong'
      })
    })
  });

  app.get("/api/series/:id/cards", (req, res) => {

    Series.find({_id: req.params.id}).limit(1).exec()
    .then( docs => {
      if( docs.length > 0 ){
        Card.find({ set: docs[0].set, release: docs[0].release }).limit(300).exec()
        .then( cards => {
          res.status(200).json(cards)
        })
      }
      else{
        res.status(500).json({
          error: true,
          message: 'Set was not found'
        })
      }
    })



  });
    
}