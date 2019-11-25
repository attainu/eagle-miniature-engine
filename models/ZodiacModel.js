const Zodiac = {};

const ZodiacData = require('./../data/Zodiac.json');
var i = 0;
Zodiac.basket = function (cb) {

        
        while (i < ZodiacData.length) {
                i++;
                return cb(null, ZodiacData[i - 1]);
        }
        
}

module.exports = Zodiac;