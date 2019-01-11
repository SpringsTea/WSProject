import { Serieses } from './stubs/Serieses'
import { Konosuba } from './stubs/Series'

module.exports = function(app){

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