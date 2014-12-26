//config.db = 'mongodb://localhost/test';

var config = require('./config.json');

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+config.database.user+':'+config.database.password+'@'+config.database.host+'/'+config.database.database);


exports.port 		= config.port;

exports.mongoose 	= mongoose;
