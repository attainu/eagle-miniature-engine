const controller = {};
const nameData = require('../data/nameApp.json');
var array = [];
var data = [];

controller.retrieve = function(req, res){
    var name = req.user.firstname;
    var nameArray = name.split('');
    for (var i=0;i<nameArray.length;i++){
        for(var j=0;j<nameData.length;j++){
            if(nameArray[i].toLowerCase() === nameData[j].word.charAt(0).toLowerCase()){
                data.push(nameData[j].word);
            }
        }
        
        var random = Math.floor(Math.random()*data.length);
        array.push(data[random]);
        data = [];
    }
   
    res.render('name',{
        name:nameArray,
        result:array
    });
    array = [];
}

module.exports = controller; 