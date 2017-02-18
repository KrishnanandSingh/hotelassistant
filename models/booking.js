var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
  service: String,
  dateTime: String,
  comment: String,
  customer: String,
  isComplete : Boolean
});

mongoose.model( 'Booking', bookingSchema );
