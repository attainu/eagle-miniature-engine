const router = require('express').Router();
<<<<<<< Updated upstream
const authCheck = function(req, res, next) {
    if(!req.user){
        res.redirect('/');
=======
const Control = require('../controllers/dbController.js');
const QControl = require('../controllers/qController.js');
const nameController = require('../controllers/nameapp');
const ZControl = require('../controllers/zController.js');
const mistakeAppController = require('../controllers/mistakeController.js');
const authCheck = function (req, res, next) {
    if (!req.user) {
        req.session.returnTo = req.originalUrl;
        res.render('login');
>>>>>>> Stashed changes
    } else {
        next();
    }
};
router.get('/', authCheck, function(req, res) {
    res.render('appTray');
});
<<<<<<< Updated upstream
router.get('/quotes', function (req, res) {
    res.render('motivationalApp');
});
router.get('/pubgQuiz', function (req, res) {
    res.render('pubgQuizApp');
});
=======


router.get('/quotes', authCheck, Control.retrieve);


router.get('/name', authCheck, nameController.retrieve);
router.get('/name/:id', nameController.display);


router.get('/pubgQuiz', authCheck, QControl.quizData);
router.post('/pubgQuiz', authCheck, QControl.quizData);

router.get('/zodiacApp',authCheck,ZControl.fetchData);

router.get('/biggestMistake', authCheck, mistakeAppController.mistake);

>>>>>>> Stashed changes
module.exports = router;