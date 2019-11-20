const router = require('express').Router();
const Control=require('../controllers/dbController.js');


const authCheck = function(req, res, next) {
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, function(req, res) {
    res.render('appTray');
});


router.get('/quotes',authCheck,Control.retrieve);


router.get('/pubgQuiz',authCheck, function (req, res) {
    res.render('pubgQuizApp');
});

module.exports = router;