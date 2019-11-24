const controller = {};
const nameData = require('../data/nameApp.json');
const nameAppModel = require('./../models/NameAppResultModel');
var randomstring = require("randomstring");
var array = [];
var data = [];

controller.retrieve = function (req, res) {
    var name;
    console.log(req.query);
    if (req.query.newName)
        name = req.query.newName;
    else
        name = req.user.firstname;
    console.log(req.query.newName, name);
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

    var uniqueURL = randomstring.generate(16);
    nameAppModel.findOne({ url: uniqueURL })
        .then((result) => {
            if (!result) {
                const newResult = {
                    url: uniqueURL,
                    username: req.user.firstname,
                    querystring: nameArray.join(""),
                    result: str
                }
                new nameAppModel(newResult).save()
            }
        })
    res.redirect('/apps/name/'+uniqueURL);
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
                res.render('name', {
                    output: out,
                    name: output.querystring
                });
            }
        })
}

module.exports = controller; 