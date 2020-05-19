const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteResultSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    }
});

const quoteResult = mongoose.model('quoteResult', quoteResultSchema);
module.exports = quoteResult;