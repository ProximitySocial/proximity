const chai = require('chai');
const expect = chai.expect;
const CryptoJS   = require("crypto-js");

chai.use(require('chai-http'));

/* Necessary so that new DB created for test cases!! */
process.env.NODE_ENV = 'test';

const server = require('./../server.js');
const mongoose = require('mongoose');
const User = require('./../models/user.js');
const baseUri = 'localhost:2323';

describe('AUTH ROUTES', () => {

  // before((done) => {
  //   this.server = server(2323, done);
  // });

  // EVENTUALLY NEED TO ADD BEFORE BLOCK TO HANDLE AUTH OF MOCK USER

  // after((done) => {
  //   this.server.close(done);
  // });

  afterEach((done) => {
    // necessary so that test DB does not keep growing after each run
    mongoose.connection.db.dropDatabase(() => { // resets DB
      done();
    });
  });


  describe('make handshake from mobile', () => {
    beforeEach((done) => {
      User.create({
        firstName:     'tester',
        lastName:      'teste',
        email:         'tester@tester.com',
        bio:           'This is my life, testing all the the tests...I stand for all test objects out there everywhere.',
        pic:           'https://www.espn.com',
        rating:        5,
        _favorites:    [],
        provider:      'facebook',
        facebook:      {"id": "1234567891011", "display_name": "tester teste"},
        access_token:  'A_FAKE_ACCESS_TOKEN',
        interests:     ['golf', 'running', 'dancing', 'vivaCity'],
        neighborhoods: ['Capitol Hill', 'Belltown']
      }, (err, data) => {
        if (err) return console.log(err);
        this.testUser = data;
        done();
      });
    });

    it('should receive a 200', (done) => {
      var token = CryptoJS.AES.encrypt(JSON.stringify(this.testUser.facebook.id), process.env.VC_SECRET_CRYPTO)
      chai.request(baseUri)
        .post(`/api/mobile/facebook/shake`)
        .set('Authorization', token)
        .send(this.testUser)
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(200)
          expect(res.body.msg).to.eql('Created User')
        });
      done();
    });

    it('should receive a 200 and have FOUND the user'), (done) => {

      done()
    }
  })
})
