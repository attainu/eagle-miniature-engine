

var globalIndex = null;
var mistake = null;


$.ajax({
  method: "GET",
  url: "https://raw.githubusercontent.com/divya-sehgal-vst-au4/mine/master/.json",
  success: function (response) {
    response = JSON.parse(response);
    //    mistake = response;
    displayToUser(response)
  },
  error: function (error) {
    console.log("Error: ", error);
  }
});


function displayToUser(response) {
  var len = 10;
  var line = response[Math.floor(Math.random() * len)];
  $('#mistake').text(line.mistake);
}

function generateRandomNumber(len) {
  var random = Math.floor(Math.random() * len);
  return random;
}

$(document).ready(function () {

  $('button').on('click', function () {
    $.ajax({
      method: "GET",
      url: "https://raw.githubusercontent.com/divya-sehgal-vst-au4/mine/master/.json",
      success: function (response) {
        response = JSON.parse(response);
        var len = 10;
        var line = response[Math.floor(Math.random() * len)];
        $('#mistake').text(line.mistake);
      },
      error: function (error) {
        console.log("Error: ", error);
      }
    });
  });
});

