var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/test';
require(__dirname + '/../server.js');
require(__dirname + '/../routes/routes');
require(__dirname + '/../lib/handle_error')
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Beverage = require(__dirname + '/../model/beverage');

describe('the beverages resource', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to get beverages', function (done) {
    chai.request(url)
      .get('/beverages')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a beverage', function (done) {
    chai.request(url)
    .post('/beverages')
    .send({name : "test beverage"})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('test beverage');
      done();
    });
  });

  describe('routes that need a beverage in the database', function () {
    beforeEach(function (done) {
      var testBev = new Beverage({name: 'test'});
      testBev.save(function (err, data) {
        if (err) throw err;
        this.testBev = data;
        done();
      }.bind(this));
    });

    it('should be able to update a beverage', function (done) {
      chai.request(url)
        .put('/beverages/' + this.testBev._id)
        .send({name: 'new test'})
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Success putting data!');
          done();
        });
    });

    it('should be able to delete a beverage', function (done) {
      chai.request(url)
        .delete('/beverages/' + this.testBev._id)
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Beverage deleted');
          done();
        });
    });
  });
});

