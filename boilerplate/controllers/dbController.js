
 
const dbController={};
const Quotes=require('../models/QuotesModel.js');

var collection=require('.././data/quotes.json');


dbController.create=function(req,res){
var data=req.body;

 Quotes.collection.insert(collection,function(error,result)
     {
    if(error){
        return res.json({
        message:'Error creating the requested document!'
    });
}
return res.json({
    message:'Success!',
    Data:result
});
});
}

dbController.retrieve=function(req,res){
    Quotes.find({},function(error,result)
        {
       if(error){
           return res.json({
           message:'Error retrieving the requested document!'
       });
   }
   var randomNumber = Math.floor( Math.random() * 109);
   return res.render('quotes',{
        quote:result[randomNumber].quote
   });
   });
   
}

module.exports=dbController;