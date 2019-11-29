const Control = {};

const date = require('date-and-time');
const Model = require('../models/ZodiacModel.js');


Control.showData = function (req, res) {
      
           return   res.render('zodiacApp');
       
};
Control.fetchData = function (req, res) {
        var Tdate = new Date();
        //console.log(DateandTime);
        var Cdate = date.format(Tdate, 'DD MMM');
        var Fname = req.user.firstname;
        var Lname = req.user.lastname;
        var Zname = req.params.id;
        //console.log(Cdate);

        Model.basket(function(err, data){
                res.render('zodiacResult', {
                        date: Cdate, 
                        FirstName: Fname,
                        LastName: Lname,
                        Zname: Zname,
                        description: data.description
                });
        })



};

module.exports = Control;