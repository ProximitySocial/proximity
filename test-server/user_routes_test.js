const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

/* Necessary so that new DB created for test cases!! */
process.env.NODE_ENV = 'test';

const server = require(__dirname + '/../server.js');
const mongoose = require('mongoose');
const User = require(__dirname + '/../models/user.js');
const baseUri = 'localhost:4343';

describe('User Routes', () => {

  after((done) => {
    // necessary so that test DB does not keep growing after each run
    mongoose.connection.db.dropDatabase(() => { // resets DB
      done();
    });
  });

  it('should be able to create a new user', (done) => {
    chai.request(baseUri)
    .post('/api/user/new')
    .send({
      firstName: 'Chris',
      lastName: 'Lee',
      email: 'chris@chris.com'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('user created');
      done();
    });
  });

  describe('routes that require an existing user', (done) => {

    beforeEach((done) => {
      User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        access_token: 'dfajkdfdjakjf'
      }, (err, data) => {
        if(err) return console.log(err);
        this.testUser = data;
        console.log(this.testUser);
        done();
      });
    });

    it('should be able to get a user', (done) => {
      console.log(this.testUser.access_token);
      chai.request(baseUri)
      .get(`/api/user/${this.testUser.access_token}`)
      .end((err, res) => {
        console.log(res.body.firstName);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('firstName');
        expect(res.body.firstName).to.eql('John');
        done();
      });
    });

    it('should be able to update a user', (done) => {
      chai.request(baseUri)
      .put(`/api/user/${this.testUser._id}`)
      .send({
        firstName: 'Jane',
        email: 'jane@doe.com'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.eql('Successfully updated user');
        expect(res.body).to.have.property('result');
        expect(res.body.result.nModified).to.eql(1);
        done();
      });
    });

    it('should be able to delete a user', (done) => {
      chai.request(baseUri)
      .delete(`/api/user/${this.testUser._id}`)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.eql('Successfully destroyed user');
        done();
      });
    });

  });

});
