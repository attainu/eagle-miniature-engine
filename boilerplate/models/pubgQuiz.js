PUBG = {};

const pubgQuiz = require('./../public/pubg.json');

var i = 0;

PUBG.data = function(cb){
        //console.log(pubgQuiz);
       // var randomQuestion = Math.floor(pubgQuiz.length);
       while(i<pubgQuiz.length){
               i++;
        return cb(null, pubgQuiz[i-1]);
       }
       //console.log(body.opt);
        

        
        
}
PUBG.result = function(rank, cb){

        if(rank <= 140){
                return cb(null, "conq");
        }
}

module.exports = PUBG;