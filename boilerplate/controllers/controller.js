Control={};

const Model=require('../models/QuotesModel.js');

// Control.home=function(req,res){
//     if(error){
//         return res.render({error:'Error,please reload or wait for sometime while the page reloads.Thank you!'});
//     }
//     return res.render('home');
// }

// Control.appTray=function(req,res){
//     if(error){
//         return res.render({error:'Error,please reload or wait for sometime while the page reloads.Thank you!'});
//     }
//     return res.render('appTray');
// }

// Control.Quiz=function(req,res){
//  Model.quiz(function(error,data){
//      if(error){
//          return res.render({error:'Error,please reload or wait for sometime while the page reloads.Thank you!'});
//      }
//      return res.render('Quiz',{

//      });
//  });
// }


Control.Quotes=function(req,res){
    Model.quotes(function(error,data){
        if(error){
            return res.render({error:'Error,please reload or wait for sometime while the page reloads.Thank you!'});
        }
        return res.render('quotes',{
            quote:data

        });
    });

}  



module.exports=Control;



