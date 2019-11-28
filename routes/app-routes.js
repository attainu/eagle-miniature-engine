const router = require('express').Router();
const Control = require('../controllers/dbController.js');
const QControl = require('../controllers/qController.js');
const nameController = require('../controllers/nameapp');
const ZControl = require('../controllers/zController.js');
const mistakeAppController = require('../controllers/mistakeController.js');
const authCheck = function (req, res, next) {
    if (!req.user) {
        req.session.returnTo = req.originalUrl;
        res.render('login');
    } else {
        next();
    }
};

router.get('/', authCheck, function (req, res) {
    res.render('appTray');
});
router.get('/quotes', authCheck, Control.retrieve);
router.get('/quotes/:id', Control.display);
router.post('/quotes/:id', Control.post);


router.get('/name', authCheck, nameController.retrieve);
router.get('/name/:id', nameController.display);



router.get('/pubgQuiz', authCheck, QControl.quizData);
router.post('/pubgQuiz', authCheck, QControl.results);

router.get('/zodiacApp',authCheck,ZControl.showData);
router.get('/zodiacResult/:z',authCheck,ZControl.fetchData);

router.get('/biggestMistake', authCheck, mistakeAppController.mistake);
module.exports = router;