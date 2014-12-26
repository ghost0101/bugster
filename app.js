'use strict'

var app    	= require('./config/express');
var config  = require('./config/config.js');




//  Sockets
var ImageSocket = require('./mods/images/socket.js');
app.io.route('posts',ImageSocket);


//  Controllers
var ImageCtrl = require('./mods/images/index.js');
var UserCtrl  = require('./mods/users/index.js');

//  API routes
app.use('/images/',ImageCtrl);
app.use('/users/',UserCtrl);


var routes = require('./routes/index.js');
app.use('/',routes);



console.log(config.config);

app.listen(config.port);
console.log("==================================================================");
console.log("=======================Listo: "+config.port+"=====================");
console.log("==================================================================");
