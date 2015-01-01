var mongoose  = require('./../config/config.js').mongoose;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: 	String,
  lastname:  String,
  facebook:String,
  about: String,
  gender: String,
  bugs: {
    type:Number,
    default:50
  },
  date: {
    type:Date,
    default:Date.now()
  }
});

// ImageSchema.methods.latest = function latest(params, callback) {
//   console.log("nouuu"+params);
// }


var User = mongoose.model('User',UserSchema);

module.exports = User;
