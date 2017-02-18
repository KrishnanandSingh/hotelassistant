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

/*
router.put('/:id', function(req, res, next) {
  var updateEmployee = {};
  var id= new mongoose.Types.ObjectId(req.params.id);
  if(req.body.name)updateEmployee.name=req.body.name;
  if(req.body.email)updateEmployee.email=req.body.email;
  if(req.body.dateOfBirth)updateEmployee.dateOfBirth=req.body.dateOfBirth;
  if(req.body.department)updateEmployee.department=req.body.department;
  if(req.body.gender)updateEmployee.gender=req.body.gender;

  Employee.update({"_id":id},updateEmployee,function(err){
      if(err){
        return res.status(500).send();
      }else{
        res.status(200).send();
      }
  });
});


router.post('/', function(req, res, next) {
  var name=req.body.name;
  var email=req.body.email;
  var dateOfBirth=req.body.dateOfBirth;
  var department=req.body.department;
  var gender =req.body.gender;

  var newEmployee=new Employee();
  newEmployee.name=name;
  newEmployee.email=email;
  newEmployee.dateOfBirth=dateOfBirth;
  newEmployee.department=department;
  newEmployee.gender=gender;

  newEmployee.save(function(err,savedEmployee){
      if(err){
        return res.status(500).send();
      }else{
        res.status(201).json(savedEmployee._id);
      }
  });
});
*/
module.exports = router;
