var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var FoodOrder = mongoose.model('FoodOrder');


router.get('/', function(req, res, next) {
  FoodOrder.find({isComplete:false}, function(err,foodOrders){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(foodOrders);
    }
   });
});

router.get('/:id', function(req, res, next) {
  var id= new mongoose.Types.ObjectId(req.params.id);
  FoodOrder.findOne({"_id":id}, function(err,foodOrder){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(foodOrder);
    }
   });
});

router.put('/:id/complete', function(req, res, next) {
  var updateFoodOrder = {};
  var id= new mongoose.Types.ObjectId(req.params.id);
  if(req.body.comment)updateFoodOrder.comment=req.body.comment;
  updateFoodOrder.isComplete="true";

  FoodOrder.update({"_id":id},updateFoodOrder,function(err){
      if(err){
        return res.status(500).send();
      }else{
        res.status(200).send();
      }
  });
});

module.exports = router;
