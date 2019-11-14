AppLogic={};


// var db=null;
// var randomNumber = Math.floor( Math.random() * 15 );
// const MongoClient=require('mongodb').MongoClient;
// var url='mongodb://localhost:27017';
// MongoClient.connect(url,function(error,client){
//     if(error){
//         throw Error;
//     }
//     db=client.db('');
//     });

//     var appCollection=db.collection('app');
//     var quizCollection=db.collection('quiz');
//     var insightsCollection=db.collection('insights');
//     var usersCollection=db.collection('users');

//     collection.find({}).toArray(function(error,response){
//         console.log(response);
//     });
    
  
    AppLogic.quiz=function(cb){

    }
    AppLogic.quotes=function(cb){

    }


    // UserSchema.statics.someMethod = function(userId, cb) {
    //     User.findById(userId, function(error, user) {
    //       if(error) {
    //         return cb(error);
    //       }
    //       return cb(null, user);
    //     });
    //   }

















    // var doUpdate = function() {
    //     $('#countdown').each(function() {
    //       var count = parseInt($(this).html());
    //       if (count !== 0) {
    //         $(this).html(count - 1);
    //       }
    //     });
    //   };
    //     setInterval(doUpdate, 1000);
    //     setTimeout(function(){
    //         
    //     },30000);
    //     setTimeout(function(){
    //         var timeOut=$('<h3/>').text('Time is Over!');
    //         timeOut.appendTo('.container');
    //     },30000);

module.exports=AppLogic;
