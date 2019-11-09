const createUser = (server, chai, data) => {
    chai.request(server)
            .post('/register')
            .send(data)
            .end((err, res) => {
                return null
            });
}
module.exports = createUser;
