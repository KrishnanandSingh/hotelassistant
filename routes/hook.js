var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.post('/hook', function (req, res) {
    console.log('hook request');
    try {
        var speech = 'empty speech';
        if (req.body) {
            var requestBody = req.body;
            if (requestBody.result) {
                speech = '';
                /*if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }*/
                if (requestBody.result.action) {
                    var action = requestBody.result.action;
                    var parameters = requestBody.result.parameters;
                    var response = ActionHandler(action,parameters);
                    speech += response;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'webhook'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

function ActionHandler(action,parameters){
    response = '';
    switch (action) {
      case 'locate':
        name = parameters.HotelLocations;
        Location.findOne({"tag":name}, function(err,path){
        if(err){
          response = "Unable to find";
        }else{
          response = location.path;
        }});
        break;
      default:

    }
    return response;
}

module.exports = router;
