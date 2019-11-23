const router = require('express').Router();
const Control=require('../controllers/dbController.js');
const QControl=require('../controllers/qController.js');
const nameController = require('../controllers/nameapp');
const authCheck = function(req, res, next) {
    if(!req.user){
        req.session.returnTo = req.originalUrl; 
        res.redirect('/login');
    } else {
        next();
    }
};

router.get('/', authCheck, function(req, res) {
    res.render('appTray');
});


router.get('/quotes',authCheck,Control.retrieve);
router.get('/name',authCheck,nameController.retrieve);


router.get('/pubgQuiz',authCheck,QControl.quizData);
router.post('/pubgQuiz',authCheck,QControl.quizData);


module.exports = router;