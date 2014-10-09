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


var userSchema = new Schema({
  firstName:  String,
  lastName:  String,
  token:  String,
  creationDate: { type: Date, default: Date.now }
});

module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.User = mongoose.model('User', userSchema);

