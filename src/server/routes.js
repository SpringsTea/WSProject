module.exports = function(app){

  app.get("/api/test", (req, res) =>
    res.send({ test: 'success' })
  );
    
}