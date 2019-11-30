const dbController = {};
const Quotes = require('../models/QuotesModel.js');
const quoteResults = require('../models/quotesResult');
var collection = require('.././data/quotes.json');
var randomstring = require("randomstring");

Quotes.countDocuments(function (err, count) {
    if (!err && count === 0) {
        Quotes.insertMany(collection);
    }
});

dbController.retrieve = function (req, res) {


    Quotes.find({}, function (error, result) {
        if (error) {
            return res.json({
                message: 'Error retrieving the requested document!'
            });
        }
        var randomNumber = Math.floor(Math.random() * 109);
        var uniqueURL = randomstring.generate(16);
        var q = result[randomNumber].quote;
        quoteResults.findOne({ url: uniqueURL })
            .then((result) => {
                if (!result) {
                    const newResult = {
                        url: uniqueURL,
                        quote: q
                    }
                    new quoteResults(newResult).save()
                }
            })
        res.redirect('/apps/quotes/' + uniqueURL);
        // return res.render('quotes', {
        //     quote: result[randomNumber].quote
        // });
    });


}

dbController.display = function(req, res){
    var uniqueURL = req.params.id;
    quoteResults.findOne({url : uniqueURL})
    .then(function(output){
        var iframe = '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2Fquotes%2F' + output.url + '%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
        res.render('quotes',{
            quote: output.quote,
            iframe: iframe
        })
    })
}

dbController.post = function(req, res){
    var uniqueURL = req.params.id;
    var quote = req.body.quote;
    console.log(quote);
    quoteResults.findOneAndUpdate({url : uniqueURL},{$set:{quote:quote}},{useFindAndModify: false})
    .then(function(output){
        console.log(output.quote);
    })
}

module.exports = dbController;