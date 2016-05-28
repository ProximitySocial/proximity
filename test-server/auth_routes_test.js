const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

/* Necessary so that new DB created for test cases!! */
process.env.NODE_ENV = 'test';

const server = require(__dirname + '/../server.js');
const mongoose = require('mongoose');
const Event = require(__dirname + '/../models/event.js');
const baseUri = 'localhost:2323';

describe('event routes', () => {

  // before((done) => {
  //   this.server = server(2323, done);
  // });

  // EVENTUALLY NEED TO ADD BEFORE BLOCK TO HANDLE AUTH OF MOCK USER

  // after((done) => {
  //   this.server.close(done);
  // });

  after((done) => {
    // necessary so that test DB does not keep growing after each run
    mongoose.connection.db.dropDatabase(() => { // resets DB
      done();
    });
  });


  describe('make handshake from mobile, return JWT', () => {
    beforeEach((done) => {
      User.create({
        title: 'test event',
        description: 'test description',
        address: '511 Boren Ave N Seattle',
        fbid: '3939393939'
      }, (err, data) => {
        if (err) return console.log(err);
        this.testEvent = data;
        console.log(this.testEvent);
        done();
      });
    });

    it('should be able to update an event', (done) => {
      chai.request(baseUri)
        .put(`/api/event/${this.testEvent._id}`)
        .send({ title: 'Updated Title', address: '845 depot rd boxboro ma' })
        .end((err, res) => {
          // NEED TO ACCOUNT FOR CASES WHERE ADDRESS IS NOT SENT IN THE UPDATE
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated event');
          expect(res.body.result.nModified).to.eql(1);
          done();
        });
    });
