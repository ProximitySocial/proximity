const chai = require('chai');
const expect = chai.expect;
const CryptoJS   = require("crypto-js");

chai.use(require('chai-http'));

/* Necessary so that new DB created for test cases!! */
process.env.NODE_ENV = 'test';

const server = require('./../server.js');
const mongoose = require('mongoose');
const User = require('./../models/user.js');
const baseUri = 'localhost:4343';
const testUser = {
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
                 }

describe('AUTH ROUTES', () => {

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


  describe('make handshake from mobile', () => {
    it('should receive a 200', (done) => {
      var token = CryptoJS.AES.encrypt(JSON.stringify(testUser.facebook.id), process.env.VC_SECRET_CRYPTO)
      chai.request(baseUri)
        .post(`/api/mobile/facebook/shake`, testUser)
        .set('Authorization', token)
        .send(this.testUser)
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(200)
          expect(res.body.msg).to.eql('Created User' | 'Found User')
        });
      done();
    });

    before((done) => {
      var testUser2 = testUser
      testUser2.facebook.id = 121110987654321
      User.create(testUser2, (err, result) => {
        if(err) console.log(err)
        this.testUser2 = result
        done()
      })
    });

    it('should receive a 200 and have FOUND the user'), (done) => {
      var testUser2 = testUser
      testUser2.facebook.id = '10987654321'
      var token = CryptoJS.AES.encrypt(JSON.stringify(testUser2.facebook.id), process.env.VC_SECRET_CRYPTO)
      console.log('User2 token: ' + token)
      chai.request(baseUri)
        .post(`/api/mobile/facebook/shake`, testUser2)
        .set('Authorization', token)
        .send(testUser2)
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(200)
          expect(res.body.msg).to.eql('Created User')
        })
      done()
    }

  })
})
