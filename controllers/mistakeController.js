const Control = {};
const Model = require('../models/MistakeApp.js');


Control.mistake = function (req, res) {
        var dp = req.user.image;
        console.log(req.user.image);
        res.locals.metaTags = {
                title: "Mistakes",
                description: "Some of the mistakes we all have done. You're not alone for doing it.",
                url: "https://entertaining--apps.herokuapp.com" + req.originalUrl
        };
        res.render('biggestMistake', {
                dp: dp,
                iframe: '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2FbiggestMistake%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'

        });


};


module.exports = Control;