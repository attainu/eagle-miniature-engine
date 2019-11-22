const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res){
    res.render('appTray');
});

router.get('/login', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'),function (req, res) {
   res.redirect(req.session.returnTo);
   delete req.session.returnTo;
});

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

module.exports = router;