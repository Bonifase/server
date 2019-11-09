process.env.NODE_ENV = 'test';

let User = require('../models/user.model');
const data = require('./data')();

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;


chai.use(chaiHttp);

//Our parent block
describe('Guests: ', () => {
    
/*
* Test the /GET guests route
*/   
describe('/GET guests', () => {
    it('it should GET all the guests', (done) => {
        chai.request(server)
            .get('/guests')
            .end((err, res) => {
                res.should.have.status(200);
            done();
            });
    });
});
/*
* Test the /POST guest route
*/
describe('/POST add guest', () => {
    it('it should ADD GUEST with field', (done) => {
        
    chai.request(server)
        .post('/guests')
        .send(data.guest1)
        .end((err, res) => {
                res.body.should.be.a('object');
                expect(res.body.msg).to.equal('Guest added');
            done();
        });
    });

    it('it should not ADD GUEST twice', (done) => {
        
        chai.request(server)
            .post('/guests')
            .send(data.guest1)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.msg).to.equal('Guest already exist');
                done();
            });
        });

    it('it should NOT ADD GUEST with empty name', (done) => {
    
        chai.request(server)
            .post('/guests')
            .send(data.guest2)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide a name');
                done();
            });
        });
    
    it('it should NOT ADD GUEST with an invalid phone number', (done) => {

        chai.request(server)
            .post('/guests')
            .send(data.guest3)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide a valid phone number');
                done();
            });
        });
    it('it should NOT ADD GUEST with empty dietary', (done) => {

        chai.request(server)
            .post('/guests')
            .send(data.guest4)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error[0].msg.should.equal('Please provide dietary');
                done();
            });
        });
});
});
