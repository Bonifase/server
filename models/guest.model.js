const mongoose = require('mongoose');

const guest = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true,
        unique: true

    },
    dietary: {
        type: String,
        required: true

    },
    isconfirmed: {
        type: Boolean,
        default: false

    },
})

module.exports = mongoose.model('guest', guest);