const router = require('express').Router();

// user model
const User = require('../../models/user.model');

// Users route-------->GET REQUEST
router.get('/users',  async (req, res) => {
    
    try {
        let users = await User.find();
        res.send({users: users})
            
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error!")
    }
});

module.exports = router;