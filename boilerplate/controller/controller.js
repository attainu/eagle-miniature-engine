const Control = {};

const model = require('../models/pubgQuiz.js');
var events = require('events');

var counter = 0;
var qstncount = 0;
var x;
var y;

Control.Question = function(req, res){

         x = req.body.opt;
        //console.log(req.answer);
     
        model.data(function(err, data){

                 y = data.answer;
                //console.log(x);


                res.render('pubgQuizApp', {
                        question:data.question,
                        option1: data.option[0],
                        option2: data.option[1],
                        option3: data.option[2],
                        option4: data.option[3]

                });

                if(x === y){
                        console.log(x, 'A scream is detected!', y);    
                  }
                 //x = req.body.opt;
               
                //console.log(data.answer);
                // if(req.body.opt =data.answer){
                //         counter++;
                //         //console.log("", counter);

                // }
                // else {
                //         counter++;
                //         //console.log("4th", counter);
                // }

               
                

                // for(i=0;i<4;i++){
                //         if(chk1 == answer){
                //                 counter = counter+10;
                //                 console.log(counter);
                //                 break;
                //         }
                //         else if(chk2 == answer){
                //                 counter = counter+10;
                //                 console.log(counter);
                //                 break;
                //         }
                //         else if(chk3 == answer){
                //                 counter = counter+10;
                //                 console.log(counter);
                //                 break;
                //         }else{
                //         counter = counter+10;
                //         console.log(counter);
                //         break;
                //         }
                // }
                        qstncount++;
                        //console.log(qstncount);
                        if(qstncount === 14){
                                res.redirect('/result');
                                model.result(counter, function(err, data){
                                        if(err){
                                                return err;
                                        }
                                        return res.render('result',{
                                                result: data
                                        });
                                });
                                //res.redirect('/result');
                        }
        });

        //console.log(x);

        var eventEmitter = new events.EventEmitter();

        eventEmitter.on('opt', function() {
          console.log('A scream is detected!', x);
         
        });
        eventEmitter.emit('opt');
        
       // console.log(model);
}



module.exports = Control;