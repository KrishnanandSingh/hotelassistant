var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Location = mongoose.model('Location');


router.get('/:tags', function(req, res, next) {
  var tags= req.params.tags.split(",");
  Location.find({"tags":{"$all":tags}}, function(err,locations){
    if(err){
      return res.status(500).send();
    }else{
      res.status(200).json(locations);
    }
   });
});



module.exports = router;
