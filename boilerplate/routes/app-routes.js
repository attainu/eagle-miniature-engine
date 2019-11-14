const router = require('express').Router();

const authCheck = function(req, res, next) {
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, function(req, res) {
    res.render('home.handlebars');
});

// Model
    // const questionsModel = require('../public/pubg.json')

    // // Quiz API Routes (api/quiz/)
    // router.get('/apps/all', (req, res, next) => {

    // req.render('quiz', {

    // })

    // // Get All Questions
    // questionsModel.find({}, function (err, items) {
    // if (err) {
    // console.log(err)
    // res.json({ err: err })
    // } else {
    // res.json({ questions: items })
    // }
    // })

    // })


module.exports = router;