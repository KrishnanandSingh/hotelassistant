var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name:  String,
  type: String,
  description: String,
  tags:[String],
  path: String
});
mongoose.model( 'Location', locationSchema );
