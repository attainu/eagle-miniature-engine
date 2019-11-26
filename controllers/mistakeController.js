const Control = {};
const Model = require('../models/MistakeApp.js');


Control.mistake = function (req, res) {
        var dp = req.user.image;
        console.log(req.user.image);

        res.render('biggestMistake', {
                                dp: dp
                        });


};


module.exports = Control;