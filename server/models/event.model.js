var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title:  String,
  venue: String ,
  time: Date,
  // location : String,
  creationDate: { type: Date, default: Date.now },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maxAttendees: Number,
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
  // comments: [{ body: String, date: Date }],
});



module.exports = mongoose.model('Event', eventSchema);



