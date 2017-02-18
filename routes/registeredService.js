var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var RegisteredService = mongoose.model('RegisteredService');


router.get('/', function(req, res, next) {
  RegisteredService.find({}, function(err,registeredServices){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(registeredServices);
    }
   });
});



module.exports = router;
