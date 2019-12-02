$(document).ready(function () {
    function postData(result, name) {
        html2canvas(document.querySelector('#shares')).then(function (canvas) {
            imgCanvas = canvas.toDataURL();
            $.ajax({
                type: "POST",
                url: "/apps/pubgQuiz/results",
                data: {
                    imgBase64: imgCanvas
                }
            }).done(function (o) {
                console.log('saved');
                $("#share-btn").removeClass("d-none");
            });
        })
    }
    postData();
})