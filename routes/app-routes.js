const router = require('express').Router();
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
router.get('/quotes', function (req, res) {
    res.render('motivationalApp');
});
router.get('/pubgQuiz', function (req, res) {
    res.render('pubgQuizApp');
});
module.exports = router;