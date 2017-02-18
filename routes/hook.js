var express = require('express');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var Booking = mongoose.model('Booking');
var RegisteredService = mongoose.model('RegisteredService');
var router = express.Router();

router.post('/', function (req, res) {
  console.log('hook request');
  if(req.body) {
    var requestBody = req.body;
    if (requestBody.result) {
      if (requestBody.result.action) {
        var action = requestBody.result.action;
        var parameters = requestBody.result.parameters;
        var contexts =  requestBody.result.contexts;
        ActionHandler(action,parameters,contexts,res);
      }
    }
  }
});
function ActionHandler(action,parameters,contexts,res){
    switch (action) {
      case 'locate':
        if(parameters.location){
          var name = parameters.location;
          locateActionHandler(location);
        }
        else{
          locateActionResolver(parameters);
        }
      break;
      case 'booking':
        if(parameters.service){
          var service = parameters.service;
          var dateTime = parameters.dateTime;
          bookingActionHandler(service,dateTime);
        }
        else{
          bookingActionResolver(parameters);
        }
      break;
      case 'roomService':
        if(parameters.service){
          var service = parameters.service;
          roomServiceActionHandler(service);
        }
        else{
          roomServiceActionResolver(parameters);
        }
      break;
      default:
      break;
    }
    console.log(response);
}

function locateActionHandler(location){
  Location.findOne({"name":location}, function(err,data){
    if(err){
      return res.status(200).send("Unable to find "+ location);
    }else{
      res.status(200).send(data.name + " is located at " + data.path);
    }
   });
}
function bookingActionHandler(service,dateTime){
  var newBooking=new Booking();
  newBooking.service=service;
  newBooking.dateTime=dateTime;
  newBooking.comment=comment;
  newBooking.customer="Chitkarsh";
  newBooking.isComplete=false;

  newBooking.save(function(err,savedBooking){
      if(err){
        return res.status(500).send();
      }else{
        res.status(201).json(savedBooking._id);
      }
  });
}
function roomServiceActionHandler(service){
  var newRegisteredService = new RegisteredService();
  newRegisteredService.service = service;
  newRegisteredService.room = "004";
  newRegisteredService.isComplete = false;
  newRegisteredService.save(function(err,savedRegisteredService){
      if(err){
        return res.status(500).send();
      }else{
        res.status(201).json(savedRegisteredService._id);
      }
  });
}
module.exports = router;
