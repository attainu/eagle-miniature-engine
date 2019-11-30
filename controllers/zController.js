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
                        description: data.description,
                        iframe:'<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2FzodiacResult%2F' + Zname + '%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'

                });
        })



};

module.exports = Control;