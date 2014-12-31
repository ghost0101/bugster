//config.db = 'mongodb://localhost/test';

var config = require('./config.json');

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+config.mongodb);

var seo = {
  title:"Bugster - El rincón de los bichos",
  image:"http://",
  description:"El lugar ideal para compartir cosas con gente igual de extraña que tú... o ligeramente peor",
  base: config.domain,
};


exports.seo     = seo;
exports.port 		= config.port;
exports.domain 	= config.domain;
exports.mongoose 	= mongoose;
