process.env.NODE_ENV = 'test';

let User = require('../models/user.model');
const data = require('./data')();
const createUser = require('./createUser')
const mongoose = require('mongoose');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;


chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    beforeEach((done) => {
        // create new user
        createUser(server, chai, data.user1)
        done();
        });
/*
* Test the /GET users route
*/   
describe('/GET users', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
    });
});
/*
* Test the /POST register route
*/
describe('/POST user Register', () => {
    it('it should REGISTER a user with field', (done) => {
        
    chai.request(server)
        .post('/register')
        .send(data.user2)
        .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('token');
            done();
        });
    });

    it('it should not REGISTER a user twice', (done) => {
        
        chai.request(server)
            .post('/register')
            .send(data.user2)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.msg).to.equal('User already exist');
                done();
            });
        });

    it('it should not REGISTER a user with empty name', (done) => {
    
        chai.request(server)
            .post('/register')
            .send(data.user3)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide a name');
                done();
            });
        });
    
    it('it should not REGISTER a user with an invalid email', (done) => {

        chai.request(server)
            .post('/register')
            .send(data.user4)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide a valid email');
                done();
            });
        });
    it('it should not REGISTER a user with empty password', (done) => {

        chai.request(server)
            .post('/register')
            .send(data.user5)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide 6 character long password');
                done();
            });
        });

});
/*
* Test the /POST login route
*/
describe('/POST user Login', () => {
    it('it should LOGIN a user with field', (done) => {
       
        chai.request(server)
            .post('/login')
            .send(data.user1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
        });
    
    it('it should NOT LOGIN a user with invalid email', (done) => {
        
        chai.request(server)
            .post('/login')
            .send(data.user4)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide a valid email');
                done();
            });
        });
    it('it should NOT LOGIN a user with wrong password', (done) => {
        
        chai.request(server)
            .post('/login')
            .send(data.user5)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.msg.should.equal('Invalid credentials');
                done();
            });
        });
    
    it('it should NOT LOGIN a user with wrong email', (done) => {
        
        chai.request(server)
            .post('/login')
            .send(data.user3)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.msg.should.equal('Invalid credentials');
                done();
            });
        });

});
//After all tests are finished drop database and close connection
after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
