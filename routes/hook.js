var express = require('express');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var router = express.Router();

router.post('/', function (req, res) {
  console.log('hook request');
  if(req.body) {
    var requestBody = req.body;
    if (requestBody.result) {
      if (requestBody.result.action) {
        var action = requestBody.result.action;
        var parameters = requestBody.result.parameters;
        response = ActionHandler(action,parameters,res);
      }
    }
  }
});
function ActionHandler(action,parameters,res){
    var response = '';
    switch (action) {
      case 'locate':
        name = parameters.HotelLocations.toLowerCase();
        Location.findOne({"tags":name}, function(err,location){
          if(err){
            response += "Unable to find";
          }else{
            response += location.path;
            res.json({
               speech: response,
               displayText: response,
               source: 'webhook'
           });
          }
        }
      );
      break;
      default:
      break;
    }
    console.log(response);
}

module.exports = router;
