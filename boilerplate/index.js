const express = require('express');
const exphbs = require('express-handlebars');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const Keys = require('./config/keys');

const app = express();


app.use(session({
    name: "App-session",
    secret: Keys.session.cookieKey,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge: 3*60*60*1000,
    }
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.engine('.handlebars',exphbs({extname:'.handlebars'}));
app.set('view engine','.handlebars');

const authRoute = require('./routes/auth-route');
const appRoute = require('./routes/app-routes');

//home route
app.use('/',authRoute);

//app routes
app.use('/apps',appRoute);

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function(){
    console.log('Connection has been made');
}).on('error', function(error){
    console.log('error>>>',error);
});


app.listen(3000,function(){
    console.log("App running on port 3000");
});