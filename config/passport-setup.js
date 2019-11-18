const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('./../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(new FacebookStrategy({

    // strategy options
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL: "/facebook/redirect",
    profileFields: ['id', 'displayName', 'name', 'photos', 'email', 'gender', 'link'],
    proxy: true
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({ facebook: profile.id })
            .then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    const newUser = {
                        facebook: profile.id,
                        fullname: profile.displayName,
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName,
                        image: `https://graph.facebook.com/${profile.id}/picture?type=large`
                    }
                    console.log(newUser);
                    new User(newUser).save()
                        .then((user) => {
                            done(null, user);
                        })
                }
            }).catch((err) => {
                if (err) {
                    throw err;
                }
            })
    }
));
