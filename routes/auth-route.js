const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'),function (req, res) {
    res.redirect('/apps');
});

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

module.exports = router;