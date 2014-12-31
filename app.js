'use strict'

var app    	= require('./config/express');
var config  = require('./config/config.js');




//  Sockets
var ImageSocket = require('./sockets/post.js');
app.io.route('posts',ImageSocket);


//  Controllers
var index = require('./routes/index');
var api   = require('./routes/api');



//  API routes
app.use('/',index);
app.use('/api/',api);


app.listen(config.port);
console.log("==================================================================");
console.log("=======================Listo: "+config.port+"=====================");
console.log("==================================================================");
