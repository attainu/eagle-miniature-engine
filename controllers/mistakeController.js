const Control = {};
const Model = require('../models/MistakeApp.js');
const MistakeAppModel = require('./../models/MistakeAppResults');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const request = require('request');

cloudinary.config({
        cloud_name: 'dyhtwa8fn',
        api_key: '567213951287329',
        api_secret: 'aKDu7VbWNwVdVgp962-J4h4-PFY'
})

var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
};
function imageUpload(imgname, req, res) {

        console.log(imgname)
        cloudinary.uploader.upload(`${__dirname}/../public/images/ShareImages/${imgname}`, function (error, response) {
                console.log(response);
                MistakeAppModel.findOne({ url: req.body.uniqueURL }).then((result) => {
                        if (!result) {
                                const newResult = {
                                        url: req.body.uniqueURL,
                                        id: req.user.facebook,
                                        result: req.body.mistake,
                                        imgurl: response.secure_url
                                }
                                new MistakeAppModel(newResult).save()
                        }
                })
                res.send('Yes');
                fs.unlinkSync(`${__dirname}/../public/images/ShareImages/${imgname}`);
        })

}
Control.mistake = function (req, res) {
        var dp = req.user.image;
        console.log(req.user.image);
        download(req.user.image, `${__dirname}/../public/images/facebook.png`, function () {
                console.log('done');
                res.locals.metaTags = {
                        title: "Mistakes",
                        description: "Some of the mistakes we all have done. You're not alone for doing it.",
                        url: "https://entertaining--apps.herokuapp.com" + req.originalUrl
                };
                res.render('biggestMistake', {
                        dp: dp,
                        iframe: '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2FbiggestMistake%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>',
                        js: '<script src="/static/JS/mistakeApp.js"></script>'
                });
        });
};

Control.display = function (req, res) {
        var uniqueURL = req.params.id;
        MistakeAppModel.findOne({ url: uniqueURL }).then((output) => {
                if (output) {
                        res.locals.metaTags = {
                                title: "Mistakes",
                                description: "Some of the mistakes we all have done. You're not alone for doing it.",
                                url: "https://entertaining--apps.herokuapp.com" + req.originalUrl
                        };
                        res.render('biggestMistake', {
                                result: output.result,
                                img: output.imgurl,
                        })
                }
        })
}
Control.store = function (req, res) {
        console.log(req.body);
        var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
        var imgStamp = 'mistake' + Date.now() + '.jpg';
        fs.writeFile(`${__dirname}/../public/images/ShareImages/${imgStamp}`, base64Data, 'base64', function (err) {
                if (err) {
                        console.log(err);
                }
                imageUpload(imgStamp, req, res);
        });
}


module.exports = Control;