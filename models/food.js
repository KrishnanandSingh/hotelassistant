var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var foodSchema = new Schema({
    foodType: String
    , items: [String]
});
mongoose.model('Food', foodSchema);