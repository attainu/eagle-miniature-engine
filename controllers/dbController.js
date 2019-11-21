const dbController = {};
const Quotes = require('../models/QuotesModel.js');

var collection = require('.././data/quotes.json');


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
        return res.render('quotes', {
            quote: result[randomNumber].quote
        });
    });


}

module.exports = dbController;