var app    	= require('express.io')();

// Send the client html.
app.get('/images', function(req, res) {
  res.sendfile(__dirname + '/public/app.html')
});

app.get('/home', function(req, res) {
  // res.sendfile(__dirname + '/public/index.html');
  res.render('app');
});

module.exports = app;
