var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://127.0.0.1/hotelassist';
//var dbURI = 'mongodb://apiai:assist12@ds023480.mlab.com:23480/hotelassist';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
