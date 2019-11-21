const Control = {};
const model = require('../models/quizModel.js');
var counter = 0;
var qstncount = 0;
var x;
var y;
Control.quizData = function(req, res){
     //Showing the Question and Answer on the Page
        model.Qstndata(function(err, data){
                res.render('pubgQuiz', {
                        question:data.question,
                        option1: data.option[0],
                        option2: data.option[1],
                        option3: data.option[2],
                        option4: data.option[3]
                });
        });
        // Taking the value of the button clicked by the user
        x = req.body.opt;
        console.log(x);
        // Storing the answer in a variable
        model.Answerdata(function(err, ansdata){
                y = ansdata.answer;
                console.log(y, "answer");
                if(x===y){
                        console.log("true", x,"similar to", y);
                        counter++;
                        qstncount++;
                        console.log(counter,"", qstncount);
                }
                else{
                        counter = counter;
                        qstncount++;
                        console.log(counter, "", qstncount);
                }
                console.log(counter,"", qstncount);
                        
        })
        if(qstncount >20){
               var n=counter; 
             
                model.result(n,function(error,data){
                   
                    if(error){ return res.send('Error!'); }
                    counter=0;
                    qstncount=0;
                    
                return res.render('result',{
                    result:n*5,
                    image:data

                });
                });
        }
        
}

module.exports = Control;