const PUBG = {};
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
        if (rank >= 9) {
                imgSrc = '/static/images/pubgConqueror.jpg';

        } else if (rank === 8) {
                imgSrc = '/static/images/pubgAce.jpg';

        } else if (rank === 7) {
                imgSrc = '/static/images/pubgCrown.jpg';

        }
        else if (rank === 6) {
                imgSrc = 'static/images/pubgDiamond.jpg';

        }
        else if (rank === 5) {
                imgSrc = '/static/images/pubgPlatinum.jpg';

        }
        else if (rank === 4) {
                imgSrc = '/static/images/pubgGold.jpg';

        } else if (rank === 3) {
                imgSrc = '/static/images/pubgSilver.jpg';

        }
        else {
                imgSrc = '/static/images/pubgBronze.jpg';

        }

        return cb(null, imgSrc);

}
module.exports = PUBG;