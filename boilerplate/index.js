const express = require('express');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const port = 3000;

var FACEBOOK_APP_ID = '426981531338869';
var FACEBOOK_APP_SECRET = '1d97c4521d1877484ebbd40aa9ccc6ad';

var fbOpts ={
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}

var fbCallback = function(accessToken, refreshToken, profile, cb) {
        
}

passport.use(new FacebookStrategy(fbOpts,fbCallback));



app.get('/', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',(req,res)=>{
    res.send("success");
});

//Below code to replace line 26-28 after further development
/*app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/
app.listen(port,()=>{
    console.log('Application running on port 3000');
});