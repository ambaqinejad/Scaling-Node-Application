const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    refrence: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = mongoose.model('user', User)