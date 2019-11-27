const Control = {};
const model = require('../models/quizModel.js');
Control.quizData = function (req, res) {
        if (req.body.correctAnswer === undefined) {
                res.render('pubgQuiz');
        }
}

Control.results = function(req, res) {
        if (req.body.correctAnswer) {
                model.result(req.body.correctAnswer, function (error, data) {

                        if (error) { return res.send('Error!'); }
                        return res.render('result', {
                                result: req.body.correctAnswer * 10,
                                image: data
                        });
                });
        }
}
module.exports = Control;