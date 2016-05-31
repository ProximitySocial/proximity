const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

/* Necessary so that new DB created for test cases!! */
process.env.NODE_ENV = 'test';

const server = require(__dirname + '/../server.js');
const mongoose = require('mongoose');
const Event = require(__dirname + '/../models/event.js');
const baseUri = 'localhost:4343';

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

  it('should be able to create a new event', (done) => {
    chai.request(baseUri)
      .post('/api/event/new')
      .send({
        'title': 'Test Event',
        'address': '2901 3rd ave seattle',
        'description': 'Test Description'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('event created');
        done();
      });
  })

  describe('REST requests that require an event already in db', () => {
    beforeEach((done) => {
      Event.create({
        title: 'Another event',
        description: 'Another description',
        address: '511 Boren Ave N Seattle'
      }, (err, data) => {
        if (err) return console.log(err);
        this.testEvent = data;
        console.log(this.testEvent);
        done();
      });
    });

    it('should be able to get all events', (done) => {
      chai.request(baseUri)
        .get('/api/events')
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should be able to update an event', (done) => {
      chai.request(baseUri)
        .put(`/api/event/${this.testEvent._id}`)
        .send({
          title: 'Updated Title',
          address: '845 depot rd boxboro ma'
        })
        .end((err, res) => {
          // NEED TO ACCOUNT FOR CASES WHERE ADDRESS IS NOT SENT IN THE UPDATE
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated event');
          expect(res.body.result.nModified).to.eql(1);
          done();
        });
    });


    it('should be able to delete a post', (done) => {
      chai.request(baseUri)
        .delete(`/api/event/${this.testEvent._id}`)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully destroyed event');
          done();
        })
    })

  });
})
