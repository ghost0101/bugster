var app    	= require('express.io')();

// Send the client html.
var RinconCtrl = require('./rincon');
var UserCtrl   = require('./user');
var PostCtrl   = require('./post');

app.use('/rincones/',RinconCtrl);
app.use('/users/',UserCtrl);
app.use('/posts/',PostCtrl);



module.exports = app;


//  Controllers
