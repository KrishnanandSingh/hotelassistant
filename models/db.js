var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://kn105:Kr!shn@#21@ds117919.mlab.com:17919/heroku_lhvqqgzw';

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
