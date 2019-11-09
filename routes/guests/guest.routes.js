const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// guest model
const Guest = require('../../models/guest.model');

// Add guest route-------->POST REQUEST
router.post('/guests', 
[
    check('name', 'Please provide a name').not().isEmpty(),
    check('phone', 'Please provide a valid phone number').isLength({min: 5, max: 15}),
    check('dietary', 'Please provide dietary').not().isEmpty()
], 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.errors})
    }
    const { name, phone, dietary } = req.body;
    try {
        let guest = await Guest.findOne({phone});
        if(guest){
            return res.status(400).json({msg: "Guest already exist"})
        }
        guest = new Guest({
            name,
            phone,
            dietary
        })
        guest.isconfirmed = false;
        await guest.save()
        res.status(200).json({msg: "Guest added"})

    } catch (error) {
        // console.error(error.message)
        res.status(500).send("Server error!")
    }
});

// Get all guests route-------->GET REQUEST
router.get('/guests',  async (req, res) => {
    
    try {
        let guests = await Guest.find();
        res.send({guest: guests})
            
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error!")
    }
});


module.exports = router;