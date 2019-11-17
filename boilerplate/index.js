const express = require('express');
const exphbs = require('express-handlebars');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const Keys = require('./config/keys');
const PORT = 3000;

const app = express();

app.use(express.json());

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


app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('public'));

app.engine('.hbs',exphbs({extname:'.hbs'}));
app.set('view engine','.hbs');


//const authRoute = require('./routes/auth-route');
//const appRoute = require('./routes/app-routes');

//home route
//app.use('/', authRoute);

//app routes
//app.use('/apps', appRoute);

//controller
const controller = require('./controller/controller.js');
app.get('/', controller.Question);
app.post('/', controller.Question);
app.get('/result', function(req, res){
    res.render('result');
})


mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function(){
    console.log('Database is connected..');

    app.listen(3000,function(){
        console.log("App is running on port:", PORT);
    });
}).on('error', function(error){
    console.log('Failed to connect to database >>>>',error);
});
