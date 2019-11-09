// generates user token
const generateToken = (payload, jwt, res) => {
    jwt.sign(payload, process.env.SECRET, {expiresIn: 3600},
        (err, token) => {
            if(err) throw err
            res.send({token: token})
        }
        
        )
};

module.exports = generateToken;