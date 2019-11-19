//Model loader

const mongoose=require('mongoose');

module.exports={
    models:
{
    Quotes:require('./QuotesModel.js')
},
    connect:function connect(){
        console.log('Requested connection to DB');
        return mongoose.connect('mongodb://localhost:27017/CheapThrills',
         { useNewUrlParser: true,
           useUnifiedTopology:true} 
         );
    }
};
