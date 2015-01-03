//config.db = 'mongodb://localhost/test';

var config = require('./config.json');

var mongoose = require('mongoose');



function handleDisconnect() {
  mongoose.connect('mongodb://'+config.mongodb,function (err) {
    if(err) {
        console.log(err);
        setTimeout(handleDisconnect, 2000);
    }
  });    
}

handleDisconnect();

var seo = {
  title:"Bugster - El rincón de los bichos",
  image:"http://bugster.mx/img/logo.png",
  description:"El lugar ideal para compartir cosas con gente igual de extraña que tú... o ligeramente peor",
  base: config.domain,
};


exports.seo     = seo;
exports.port 		= config.port;
exports.domain 	= config.domain;
exports.mongoose 	= mongoose;
exports.facebook  = config.facebook;
