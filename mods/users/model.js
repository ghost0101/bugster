var mongoose  = require('./../../config/config.js').mongoose;

var User = mongoose.model('User',{
  name:String,
  surname:String,
  nick:String,
  facebook:String,
  date:Date,
});


module.exports = User
