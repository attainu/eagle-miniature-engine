const Control = {};
const model = require('../models/quizModel.js');
Control.quizData = function (req, res) {
        if (req.body.correctAnswer === undefined) {
                res.locals.metaTags = { 
                        title: "PUBG Quiz", 
                        description: "You think you know everything about you're favorite game? We doubt it, so help prove us wrong by taking this quiz!",
                        url: "https://entertaining--apps.herokuapp.com"+ req.originalUrl    
                };
                res.render('pubgQuiz');
        }
}

Control.results = function(req, res) {
        if (req.body.correctAnswer) {
                model.result(req.body.correctAnswer, function (error, data) {

                        if (error) { return res.send('Error!'); }
                        res.locals.metaTags = { 
                                title: "PUBG Quiz", 
                                description: "You think you know everything about you're favorite game? We doubt it, so help prove us wrong by taking this quiz!",
                                url: "https://entertaining--apps.herokuapp.com"+ req.originalUrl    
                        };
                        return res.render('result', {
                                result: req.body.correctAnswer * 10,
                                image: data
                        });
                });
        }
}
module.exports = Control;