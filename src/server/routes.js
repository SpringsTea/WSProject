import { Serieses } from './stubs/Serieses'

module.exports = function(app){

  app.get("/api/test", (req, res) =>
    res.send({ test: 'success' })
  );

  app.get("/api/serieslist", (req, res) =>
    res.send(Serieses)
  );
    
}