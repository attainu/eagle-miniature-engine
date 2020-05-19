const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizAppResultSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    }
});

const QuizAppResult = mongoose.model('QuizAppResult', QuizAppResultSchema);
module.exports = QuizAppResult;