var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);
describe('index',function(){
  it('should return version on  /', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res){
      expect(err).to.be.null;
      done();
    });
  });
});
