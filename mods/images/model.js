var config  = require('./../../config/config.js');
mongoose = config.mongoose;
var Schema = mongoose.Schema;

var Image = mongoose.model('Image', {
		title: 	String,
		url: 		String,
		description: String,
		date: {
			type:Date,
			default:Date.now()
			},
		tags: {
			type: String,
			lowercase: true },
		_user: {
			type:Schema.Types.ObjectId,
			ref:'User'
			}
	});

/*
var img = new Image({title:"First Image!!",url:"http://intrabits.net/img/logo.png",description:"Nothing by now"});

img.save(function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log("Imágen guardada");
	}
});
*/


exports = Image;

/*
var Video = mongoose.model('Video',{
		title: String,
		youtube: String,
		description: String
	});


var Post = mongoose.model('Post',{
	title:String,
	description:String,
	content: String,
});



var Message = mongoose.model('Message',{
	content:String,
	//	sfrom
	//	to
});

var Bug = mongoose.model('Bug',{
	//	Denominación/valor ?
	//	Dueño
	//	Fecha de creación
	//	Cómo apareció este bug? regalo, premio, comercio, etc
});

var Comment = mongoose.model('Comment',{
	user:
	body: // cuerpo del mensaje
	to://a qué contenido va dirigido el mensaje, puede ser una imágen, video, post, usuario, o incluso otro comment
	date:

});

*/
