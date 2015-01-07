var mongoose  = require('./../config/config.js').mongoose;
var shortId   = require('shortid');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  post_id:{
    type:     String,
    unique:   true,
    'default':  shortId.generate
  },
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

PostSchema.statics.random = function(parameters,callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne(parameters).skip(rand).exec(callback);
  }.bind(this));
};

PostSchema.statics.related = function(rincon,limit,callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }

    this.find({rincon:rincon}).limit(limit).exec(callback);
  }.bind(this));
};


// ImageSchema.methods.latest = function latest(params, callback) {
//   console.log("nouuu"+params);
// }


var Post = mongoose.model('Post',PostSchema);

module.exports = Post;
