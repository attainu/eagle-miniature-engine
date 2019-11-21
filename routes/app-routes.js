const router = require('express').Router();
const Control=require('../controllers/dbController.js');
const QControl=require('../controllers/qController.js');

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


router.get('/pubgQuiz',authCheck,QControl.quizData);
router.post('/pubgQuiz',authCheck,QControl.quizData);


module.exports = router;