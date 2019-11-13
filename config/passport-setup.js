const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('./../models/User');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });
});


passport.use(new FacebookStrategy({

    // strategy options
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL:'/facebook/redirect'

    },function(accessToken, refreshToken, profile, done){
    //passport callback

    User.findOne({facebookId: profile.id}).then(function(currentUser){
        if(currentUser){
            console.log('User is ', currentUser);
            done(null, currentUser);
        }
        else
        {
            new User({
                username   : profile.displayName,
                facebookId : profile.id
            }).save().then(function(newUser){
                console.log("new user created "+ newUser);
                done(null, newUser);
            });
        }
    });

}));
