


const express = require('express');
const exphbs = require('express-handlebars');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const Keys = require('./config/keys');
const PORT = 3000;

const app = express();

app.use(session({
    name: "App-session",
    secret: Keys.session.cookieKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3 * 60 * 60 * 1000,
    }
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({ extended: true, limit: '50mb'  }));
app.use('/static', express.static('public'));

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');


const authRoute = require('./routes/auth-route');
const appRoute = require('./routes/app-routes');


//home route
app.use('/', authRoute);

//app routes
app.use('/apps', appRoute);




mongoose
    .connect(Keys.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(process.env.PORT || PORT, function () {
            console.log("App is running on port:", PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });

