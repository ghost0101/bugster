//config.db = 'mongodb://localhost/test';

var config = require('./config.json');

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+config.mongodb);


exports.port 		= config.port;
exports.domain 	= config.domain;
exports.mongoose 	= mongoose;
