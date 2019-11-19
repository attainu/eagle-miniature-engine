const express=require('express');
const app=express();
const port=9090;
const exphbs=require('express-handlebars');
const hbs = exphbs.create({
	extname: '.hbs'
});
app.engine('.hbs',hbs.engine);
app.set('view engine','.hbs');

app.use(express.json());



const db=require('./models/index.js');



const Control=require('./controllers/dbController.js');


app.post('/quotes',Control.create);

app.get('/quotes',Control.retrieve);

db.connect()
.then(function(){
    console.log('Connected to DB');
    app.listen(port,function(){
        console.log('The app started on port: ',port);
        }).on('error',function(){
        console.log('Error loading!');
        });

        
})
.catch(function(error){
    console.log('DB connection failed!');
})



