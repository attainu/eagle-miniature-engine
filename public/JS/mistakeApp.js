var mistake = null;
var len = 10;
var initial = true;

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

$(document).ready(function () {
  var mistakeObject = {};
  $.ajax({
    method: "GET",
    url: "https://raw.githubusercontent.com/divya-sehgal-vst-au4/mine/master/.json",
    success: function (response) {
      mistakeObject = JSON.parse(response);
      displayData();
    },
    error: function (error) {
      console.log("Error: ", error);
    }
  });
  function displayData() {
    var line = mistakeObject[Math.floor(Math.random() * len)];
    console.log(line);
    console.log(line.mistake);
    mistake = line.mistake;
    $('#mistake').text(line.mistake);
    storeData();
  }
  function storeData() {
    $('.first').addClass('d-none');
    $("#share-btn").addClass("d-none");
    html2canvas(document.querySelector('#pic')).then(function (canvas) {
      imgCanvas = canvas.toDataURL();
      var uniqueURL = makeid(16);
      console.log(uniqueURL);
      $.ajax({
        type: "POST",
        url: "/apps/biggestMistake",
        data: {
          imgBase64: imgCanvas,
          mistake: mistake,
          uniqueURL: uniqueURL
        }
      }).done(function (o) {
        var frame = '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fentertaining--apps.herokuapp.com%2Fapps%2FbiggestMistake%2F' + uniqueURL + '%23&layout=button&size=large&appId=473078063552105&width=77&height=28" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
        $('.fb-share').html(frame);
        $('.first').removeClass('d-none');
        $("#share-btn").removeClass("d-none");
      });
    })
  }

  $('button').on('click', function () {
    displayData();
  });
});

