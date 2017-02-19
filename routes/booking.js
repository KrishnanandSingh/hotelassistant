var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Booking = mongoose.model('Booking');


router.get('/', function(req, res, next) {
  Booking.find({}, function(err,bookings){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(bookings);
    }
   });
});

router.get('/:id', function(req, res, next) {
  var id= new mongoose.Types.ObjectId(req.params.id);
  Booking.findOne({"_id":id}, function(err,booking){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(booking);
    }
   });
});

router.put('/:id/complete', function(req, res, next) {
  var updateBooking = {};
  var id= new mongoose.Types.ObjectId(req.params.id);
  if(req.body.comment)updateBooking.comment=req.body.comment;
  updateBooking.isComplete="true";

  Booking.update({"_id":id},updateBooking,function(err){
      if(err){
        return res.status(500).send();
      }else{
        res.status(200).send();
      }
  });
});

module.exports = router;
