const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const generateToken = require('./generateToken');

// user model
const User = require('../models/user.model');

// get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('password')
        res.json({user: user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg: "Server Error"})
    }
})

// register route-------->POST REQUEST
router.post('/login', 
[
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please provide 6 character long password').exists()
], 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.errors})
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid credentials"})
        }
        
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({msg: "Invalid credentials"})
        }
        const payload = {
            user: {id: user.id}
        }
        generateToken(payload, jwt, res);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error!")
    }
});

module.exports = router;