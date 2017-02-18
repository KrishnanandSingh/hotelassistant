var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registeredServiceSchema = new Schema({
  name:  String,
  type: String,
  time: Date,
  serveredBy: String,
  comment: String,
  room: String,
  service : String,
  customer : String

});
mongoose.model( 'RegisteredService', registeredServiceSchema );
