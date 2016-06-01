const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

/* Necessary so that new DB created for test cases!! */
process.env.NODE_ENV = 'test';

const server = require(__dirname + '/../server.js');
const mongoose = require('mongoose');
const Event = require(__dirname + '/../models/event.js');
const User = require(__dirname + '/../models/user.js');
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
  });

  describe('REST requests that require an event already in db', () => {

    beforeEach((done) => {

      var picUrl = 'http://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg';

      User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        pic: picUrl
      }, (err, data) => {
        this.testUser = data;
        Event.create({
          title: 'Another event',
          description: 'Another description',
          address: '511 Boren Ave N Seattle',
          _attendees: [data._id]
        }, (err, data) => {
          if (err) return console.log(err);
          this.testEvent = data;
          done();
        });
      });

    });

    it('should be able to get all events', (done) => {
      chai.request(baseUri)
        .get('/api/events')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should be able to get a specific event', (done) => {
      chai.request(baseUri)
        .get(`/api/event/${this.testEvent._id}`)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('title');
          expect(Array.isArray(res.body)).to.eql(false);
          expect(res.body.title).to.eql('Another event');
          done();
        })
    });

    it('should return an error if trying to retrieve invalid event', (done) => {
      chai.request(baseUri)
        .get('/api/event/fadjfkdjf')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res).to.have.status(500);
          expect(res.body.msg).to.eql('Server Error');
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
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully updated event');
          expect(res.body.result.nModified).to.eql(1);
          done();
        });
    });

    it('should return an error if trying to update invalid event', (done) => {
      chai.request(baseUri)
        .put('/api/event/fadjfkdjf')
        .send({
          title: 'Updated Title',
          address: '845 depot rd boxboro ma'
        })
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res).to.have.status(500);
          expect(res.body.msg).to.eql('Server Error');
          done();
        });
    });

    it('should be able to delete an event', (done) => {
      chai.request(baseUri)
        .delete(`/api/event/${this.testEvent._id}`)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully destroyed event');
          done();
        });
    });

    it('should be able to retrieve the user object of all attendees of an event', (done) => {
      chai.request(baseUri)
        .get(`/api/event/attendees/${this.testEvent._id}`)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(Array.isArray(res.body));
          expect(res.body.length).to.eql(1);
          expect(typeof res.body[0]).to.eql('object');

          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]._id).to.eql(this.testUser._id.toString())

          expect(res.body[0]).to.have.property('pic');
          expect(res.body[0].pic).to.eql(this.testUser.pic);

          expect(res.body[0]).to.have.property('firstName');
          expect(res.body[0].firstName).to.eql(this.testUser.firstName);

          expect(res.body[0]).to.have.property('lastName');
          expect(res.body[0].lastName).to.eql(this.testUser.lastName);

          expect(res.body[0]).to.have.property('email');
          expect(res.body[0].email).to.eql(this.testUser.email);
          done();
        });
    });

  });
});
