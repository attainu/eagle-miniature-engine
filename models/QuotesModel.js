

const mongoose=require('mongoose');


const QuoteSchema=new mongoose.Schema({
  quote:{
      type:String
    }
},{collection:'QuotesCollection'});

const Quotes=mongoose.model('Quotes',QuoteSchema);

module.exports=Quotes;