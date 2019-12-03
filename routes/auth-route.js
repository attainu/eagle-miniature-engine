const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res){
    res.locals.metaTags = {
        title: "Cheap Thrills ",
        description: "Entertaining games created using FB Graph API",
        url: "https://entertaining--apps.herokuapp.com"
    };
    res.render('appTray',{
        img: 'http://entertaining--apps.herokuapp.com/static/images/I_love_cheap_thrills.png'
    });
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