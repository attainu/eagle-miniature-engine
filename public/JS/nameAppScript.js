$(document).ready(function () {
    var newPage = true, share = false;
    var imgCanvas = "";
    $('#new_name').on('click', function () {
        $('#form').removeClass("d-none");
    });
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function postData(result, name) {
        html2canvas(document.querySelector('.share')).then(function (canvas) {
            imgCanvas = canvas.toDataURL();
            $.ajax({
                type: "POST",
                url: "/apps/name",
                data: {
                    imgBase64: imgCanvas
                }
            }).done(function (o) {
                // console.log('saved');
                $("#share-btn").removeClass("d-none");
            });
        })
    }
    postData();
})
