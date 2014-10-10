var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
  title:  String,
  venue: { name : String, location : String },
  creationDate: { type: Date, default: Date.now },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
  // comments: [{ body: String, date: Date }],
});


var services = 'facebook window google'.split(' ');
var gender = 'male female'.split(' ');


var userSchema = new Schema({
  firstName:  String,
  middleName:  String,
  lastName:  String,
  gender:  { type: String, enum: gender },
  email:  String,
  picture: String,
  service: { type: String, enum: services },
  serviceUserId: String,
  accessToken:  String,
  tokenExpiration:  Date,
  creationDate: { type: Date, default: Date.now }
});

module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.User = mongoose.model('User', userSchema);



