const Control = {};
const model = require('../models/quizModel.js');
var counter = 0;
var qstncount = 0;
var x;
var y;
Control.quizData = function (req, res) {
        //Showing the Question and Answer on the Page
        model.Qstndata(function (err, data) {
                res.render('pubgQuiz', {
                        question: data.question,
                        option1: data.option[0],
                        option2: data.option[1],
                        option3: data.option[2],
                        option4: data.option[3]
                });
        });
        // Taking the value of the button clicked by the user
        x = req.body.opt;
        // Storing the answer in a variable
        model.Answerdata(function (err, ansdata) {
                y = ansdata.answer;
                if (x === y) {
                        counter++;
                        qstncount++;
                }
                else {
                        counter = counter;
                        qstncount++;
                }

        })
        if (qstncount > 20) {
                model.result(counter, function (error, data) {
                        if (error) {
                                return res.send('Error!');
                        }

                        return res.render('result', {
                                result: counter * 5,
                                image: data

                        });
                });
        }

}

module.exports = Control;