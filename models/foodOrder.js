var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodOrderSchema = new Schema({
  item: String,
  quantity: String,
  room: String,
  comment: String,
  isComplete : Boolean
});

mongoose.model( 'FoodOrder', foodOrderSchema );
