var mongoose  = require('./../config/config.js').mongoose;

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: 	String,
  image:  String,
  youtube:String,
  url: 		String,
  description: String,
  views:  {
    type:Number,
    default:0
  },
  rincon: {
    type:Schema.Types.ObjectId,
    ref:'Rincon'
  },
  date: {
    type:Date,
    default:Date.now()
    },
  tags: [{
    type: String,
    lowercase: true }],
  user: {
    type:Schema.Types.ObjectId,
    ref:'User'
  }
});

// ImageSchema.methods.latest = function latest(params, callback) {
//   console.log("nouuu"+params);
// }


var Post = mongoose.model('Post',PostSchema);

module.exports = Post;
