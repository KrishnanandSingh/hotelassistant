var express = require('express');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var Booking = mongoose.model('Booking');
var FoodOrder = mongoose.model('FoodOrder');
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
        var resolvedQuery = requestBody.result.resolvedQuery;
        ActionHandler(action,parameters,contexts,resolvedQuery,res);
      }
    }
  }
});
function ActionHandler(action,parameters,contexts,resolvedQuery,res){
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
          roomServiceActionHandler(service,resolvedQuery,res);
        }
        else{
          roomServiceActionResolver(parameters);
        }
      break;
      case 'foodOrder':
        if(parameters.item){
          item = parameters.item;
          quantity = parameters.quantity;
          orderFoodActionHandler(item,quantity,res);
        }
        else{
          locateActionResolver(parameters);
        }
      break;
      default:
      break;
    }
}

function locateActionHandler(name,res){
  Location.findOne({"name":name}, function(err,data){
    if(err || data == null){
      return res.status(200).json({
        speech:"Unable to locate "+ name,
        displayText:"Unable to locate "+ name,
        source:"webhook"
      });
    }else{
      res.status(200).json({
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
function roomServiceActionHandler(service,comment,res){
  var newRegisteredService = new RegisteredService();
  newRegisteredService.comment = comment;
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
function orderFoodActionHandler(item,quantity,res){
  var newFoodOrder = new FoodOrder();
  newFoodOrder.item = item;
  newFoodOrder.room = "004";
  newFoodOrder.quantity = quantity;
  newFoodOrder.isComplete = false;
  newFoodOrder.save(function(err,savedFoodOrder){
      if(err){
        return res.status(500).send();
      }else{
        var response = "Order for "+item+ " placed";
        res.status(200).json({
          speech:response,
          displayText:response,
          source:"webhook"
        });
      }
  });
}
module.exports = router;
