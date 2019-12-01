const controller = {};
const nameData = require('../data/nameApp.json');
const nameAppModel = require('./../models/NameAppResultModel');
var randomstring = require("randomstring");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
var array = [];
var data = [];
var uniqueURL = '';

cloudinary.config({
    cloud_name: 'dyhtwa8fn',
    api_key: '567213951287329',
    api_secret: 'aKDu7VbWNwVdVgp962-J4h4-PFY'
})
function imageUpload(imgname, url) {

    console.log(url)
    cloudinary.uploader.upload(`${__dirname}/../public/images/NameAppImages/${imgname}`, function (error, response) {
        console.log(response);
        nameAppModel.findOneAndUpdate({ url: url }, { $set: { imgurl: response.secure_url } }, { useFindAndModify: false })
            .then(function (output) {
                console.log(output);
            })

    })
}

controller.retrieve = function (req, res) {
    var name;
    if (req.query.newName)
        name = req.query.newName;
    else
        name = req.user.firstname;
    var nameArray = name.split('');
    for (var i = 0; i < nameArray.length; i++) {
        for (var j = 0; j < nameData.length; j++) {
            if (nameArray[i].toLowerCase() === nameData[j].word.charAt(0).toLowerCase()) {
                data.push(nameData[j].word);
            }
        }
        var random = Math.floor(Math.random() * data.length);
        array.push(data[random]);
        data = [];
    }
    var str = array.join("#");
    uniqueURL = randomstring.generate(16);
    nameAppModel.findOne({ url: uniqueURL })
        .then((result) => {
            if (!result) {
                const newResult = {
                    url: uniqueURL,
                    username: req.user.firstname,
                    querystring: nameArray.join(""),
                    result: str,
                    imgurl: ' '
                }
                new nameAppModel(newResult).save()
            }
        })
    var iframe = '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2Fname%2F' + uniqueURL + '%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
    var out = [];
    for (var i = 0; i < name.length; i++) {
        var output = new Object();
        output.char = name[i];
        output.adj = array[i];
        out.push(output);
    }
    res.render('name', {
        output: out,
        name: name,
        frame: iframe,

        js: '<script src="/static/JS/nameAppScript.js"></script>'
    });
    // res.redirect('/apps/name/' + uniqueURL);
    array = [];
}

controller.display = function (req, res) {
    var uniqueURL = req.params.id;
    var nameArray, array;
    nameAppModel.findOne({ url: uniqueURL })
        .then((output) => {
            if (output) {
                nameArray = [...output.querystring];
                array = output.result.split("#");
                var out = [];
                for (var i = 0; i < nameArray.length; i++) {
                    var outputs = new Object();
                    outputs.char = nameArray[i];
                    outputs.adj = array[i];
                    out.push(outputs);
                }
                console.log(output);
                res.locals.metaTags = { 
                    title: "What's in a Name?", 
                    description: "Find out some cool adjectives for you name!!",
                    url: "https://entertaining--apps.herokuapp.com"+ req.originalUrl    
                }; 
                res.render('name', {
                    output: out,
                    name: output.querystring,
                    img: output.imgurl
                });
            }
        })
}

controller.store = function (req, res) {
    // console.log(req.body)
    var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
    var imgStamp = 'name' + Date.now() + '.jpg';
    fs.writeFile(`${__dirname}/../public/images/NameAppImages/${imgStamp}`, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
    if (!req.body.url) {
        imageUpload(imgStamp, uniqueURL);
        uniqueURL = '';
    } else {
        imageUpload(imgStamp, req.body.url)
    }
    res.send('Yes');
}

module.exports = controller; 