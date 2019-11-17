const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    fbTokens: Array,
    facebook: {
        type: String
    },
});

const User = mongoose.model('user',userSchema);

module.exports = User;