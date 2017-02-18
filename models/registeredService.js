var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registeredServiceSchema = new Schema({
  service: String,
  serveredBy: String,
  comment: String,
  room: String,
  isComplete : Boolean
});

mongoose.model( 'RegisteredService', registeredServiceSchema );
