const Control = {};
const model = require('../models/quizModel.js');
const QuizAppModel = require('../models/QuizAppResults');
var uniqueURL = "";
var randomstring = require("randomstring");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
var resultTrophy = ['pubgBronze.jpg', 'pubgBronze.jpg', 'pubgBronze.jpg', 'pubgSilver.jpg', 'pubgGold.jpg', 'pubgPlatinum.jpg', 'pubgDiamond.jpg', 'pubgCrown.jpg', 'pubgAce.jpg', 'pubgConqueror.jpg'];
cloudinary.config({
        cloud_name: 'dyhtwa8fn',
        api_key: '567213951287329',
        api_secret: 'aKDu7VbWNwVdVgp962-J4h4-PFY'
})
function imageUpload(imgname, url) {

        console.log(url)
        cloudinary.uploader.upload(`${__dirname}/../public/images/ShareImages/${imgname}`, function (error, response) {
                console.log(response);
                QuizAppModel.findOneAndUpdate({ url: url }, { $set: { imgurl: response.secure_url } }, { useFindAndModify: false })
                        .then(function (output) {
                                console.log(output);
                                fs.unlinkSync(`${__dirname}/../public/images/ShareImages/${imgname}`);
                        })
        })

}

Control.quizData = function (req, res) {
        if (req.body.correctAnswer === undefined) {
                res.locals.metaTags = {
                        title: "PUBG Quiz",
                        description: "You think you know everything about you're favorite game? We doubt it, so help prove us wrong by taking this quiz!",
                        url: "https://entertaining--apps.herokuapp.com" + req.originalUrl
                };
                res.render('pubgQuiz');
        }
}

Control.results = function (req, res) {
        if (req.body.correctAnswer) {
                model.result(req.body.correctAnswer, function (error, data) {

                        if (error) { return res.send('Error!'); }
                        res.locals.metaTags = {
                                title: "PUBG Quiz",
                                description: "You think you know everything about you're favorite game? We doubt it, so help prove us wrong by taking this quiz!",
                                url: "https://entertaining--apps.herokuapp.com" + req.originalUrl
                        };
                        uniqueURL = randomstring.generate(16);
                        var iframe = '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2FpubgQuiz%2F' + uniqueURL + '%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
                        res.render('result', {
                                result: req.body.correctAnswer * 10,
                                name: req.user.firstname,
                                image: data,
                                frame: iframe,
                                js: '<script src="/static/JS/quizAppScript.js"></script>'
                        });
                });
        }
        QuizAppModel.findOne({ url: uniqueURL }).then((result) => {
                if (!result) {
                        const newResult = {
                                url: uniqueURL,
                                username: req.user.firstname,
                                result: req.body.correctAnswer * 10,
                                imgurl: ' '
                        }
                        new QuizAppModel(newResult).save()
                }
        })
}

Control.display = function (req, res) {
        var uniqueURL = req.params.id;
        QuizAppModel.findOne({ url: uniqueURL }).then((output) => {
                if (output) {
                        console.log(output);
                        res.locals.metaTags = {
                                title: "PUBG Quiz",
                                description: "You think you know everything about you're favorite game? We doubt it, so help prove us wrong by taking this quiz!",
                                url: "https://entertaining--apps.herokuapp.com" + req.originalUrl
                        };
                        res.render('result', {
                                name: output.username,
                                result: output.result,
                                image: `/static/images/${resultTrophy[Number(output.result) / 10]}`,
                                img: output.imgurl
                        })
                }
        })
}

Control.store = function (req, res) {
        var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
        var imgStamp = 'quiz' + Date.now() + '.jpg';
        fs.writeFile(`${__dirname}/../public/images/ShareImages/${imgStamp}`, base64Data, 'base64', function (err) {
                if (err) {
                        console.log(err);
                }
        });
        imageUpload(imgStamp, uniqueURL);
        res.send('Yes');
}
module.exports = Control;