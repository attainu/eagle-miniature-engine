const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MistakeAppResultSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    }
});

const MistakeAppResult = mongoose.model('MistakeAppResult', MistakeAppResultSchema);
module.exports = MistakeAppResult;