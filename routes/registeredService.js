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

router.get('/:id', function(req, res, next) {
  var id= new mongoose.Types.ObjectId(req.params.id);
  RegisteredService.find({"_id":id}, function(err,registeredService){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(registeredService);
    }
   });
});

router.put('/:id/complete', function(req, res, next) {
  var updateRegisteredService = {};
  var id= new mongoose.Types.ObjectId(req.params.id);
  if(req.body.serveredBy)updateRegisteredService.serveredBy=req.body.serveredBy;
  updateRegisteredService.isComplete="true";

  RegisteredService.update({"_id":id},updateRegisteredService,function(err){
      if(err){
        return res.status(500).send();
      }else{
        res.status(200).send();
      }
  });
});

module.exports = router;
