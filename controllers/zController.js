const Control = {};

const date = require('date-and-time');
const Model = require('../models/ZodiacModel.js');


Control.fetchData = function (req, res) {
        var Tdate = new Date();
        //console.log(DateandTime);
        var Cdate = date.format(Tdate, 'DD MMM');
        var Fname = req.user.firstname;
        var Lname = req.user.lastname;
        //console.log(Cdate);

        Model.basket(function(err, data){
                res.render('zodiacApp', {
                        date: Cdate, 
                        FirstName: Fname,
                        LastName: Lname,
                        description: data.description
                });
        })



};


module.exports = Control;