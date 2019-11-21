PUBG = {};
const pubgQuiz = require('./../data/quiz.json');
const pubgAnswer = require('./../data/quizanswers.json');
var i = 0;
var j = 0;
PUBG.Qstndata = function (cb) {

        while (i < pubgQuiz.length) {
                i++;
                return cb(null, pubgQuiz[i - 1]);
        }
}
PUBG.Answerdata = function (cb) {

        while (j < pubgAnswer.length) {
                j++;
                return cb(null, pubgAnswer[j - 1]);
        }
}
PUBG.result = function (rank, cb) {
        i = j = 0;
        if (rank >= 19) {
                imgSrc = '/static/images/pubgConqueror.jpg';

        } else if (rank === 18) {
                imgSrc = '/static/images/pubgAce.jpg';

        } else if (rank === 16) {
                imgSrc = '/static/images/pubgCrown.jpg';

        }
        else if (rank === 14) {
                imgSrc = 'static/images/pubgDiamond.jpg';

        }
        else if (rank === 12) {
                imgSrc = '/static/images/pubgPlatinum.jpg';

        }
        else if (rank === 10) {
                imgSrc = '/static/images/pubgGold.jpg';

        } else if (rank === 8) {
                imgSrc = '/static/images/pubgSilver.jpg';

        }
        else {
                imgSrc = '/static/images/pubgBronze.jpg';

        }

        return cb(null, imgSrc);

}
module.exports = PUBG;