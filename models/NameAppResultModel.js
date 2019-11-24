const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameAppResultSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    querystring: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});

const NameAppResult = mongoose.model('NameAppResult', NameAppResultSchema);
module.exports = NameAppResult;