var express = require('express');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var Booking = mongoose.model('Booking');
var RegisteredService = mongoose.model('RegisteredService');
var router = express.Router();

router.post('/', function (req, res, next) {
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
          locateActionHandler(name,res);
        }
        else{
          locateActionResolver(parameters);
        }
      break;
      case 'booking':
        if(parameters.service){
          var service = parameters.service;
          var dateTime = parameters.dateTime;
          bookingActionHandler(service,dateTime,res);
        }
        else{
          bookingActionResolver(parameters);
        }
      break;
      case 'roomService':
        if(parameters.service){
          var service = parameters.service;
          roomServiceActionHandler(service,res);
        }
        else{
          roomServiceActionResolver(parameters);
        }
      break;
      default:
      break;
    }
}

function locateActionHandler(name,res){
  Location.findOne({"name":name}, function(err,data){
    if(err){
      return res.status(200).send("Unable to find "+ name);
    }else{
      res.status(200).json({
        //if null send null response
        speech:data.path,
        displayText:data.path,
        source:"webhook"
      });
    }
   });
}
function bookingActionHandler(service,dateTime,res){
  var newBooking=new Booking();
  newBooking.service=service;
  newBooking.dateTime=dateTime;
  newBooking.customer="Chitkarsh";
  newBooking.isComplete=false;

  newBooking.save(function(err,savedBooking){
      if(err){
        return res.status(500).send();
      }else{
        var response = "Booking request for "+service+" at "+dateTime+" registered";
        res.status(200).json({
          speech:response,
          displayText:response,
          source:"webhook"
        });
      }
  });
}
function roomServiceActionHandler(service,res){
  var newRegisteredService = new RegisteredService();
  newRegisteredService.service = service;
  newRegisteredService.room = "004";
  newRegisteredService.isComplete = false;
  newRegisteredService.save(function(err,savedRegisteredService){
      if(err){
        return res.status(500).send();
      }else{
        var response = "Room service request for "+service+ " registered";
        res.status(200).json({
          speech:response,
          displayText:response,
          source:"webhook"
        });
      }
  });
}
module.exports = router;
