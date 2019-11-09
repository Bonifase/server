const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../helper');

// user model
const User = require('../../models/user.model');

// register route-------->POST REQUEST
router.post('/register', 
[
    check('name', 'Please provide a name').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please provide 6 character long password').isLength({min: 8, max: 15})
], 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.errors})
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: "User already exist"})
        }
        user = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {id: user.id}
        }
        generateToken(payload, jwt, res);

    } catch (error) {
        // console.error(error.message)
        res.status(500).send("Server error!")
    }
});

module.exports = router;