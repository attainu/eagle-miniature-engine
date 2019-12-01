$(document).ready(function () {
    var questions = null, questionNumber = 0, correctAns = 0;

    $('#change').on('click', function () {
        $.ajax({
            method: "GET",
            url: "/static/data/quotes.json",

            success: function (quotes) {
                var i = Math.floor(Math.random() * 109);
                $('#quote').html(quotes[i].quote);
                var url = window.location.href;
                $.ajax({
                    method: 'POST',
                    url: url,
                    data: {
                        quote: quotes[i].quote
                    },
                    success: function (res) {
                        console.log("posted");
                    }
                });

            },
            error: function (error) {
                alert('Fetching failed', error);
            }
        });
    });
    $.ajax({
        method: "GET",
        url: "/static/data/quiz.json",

        success: function (data) {
            questions = data;
            questionsDisplay(questionNumber);
        },
        error: function (error) {
            alert('Fetching failed', error);
        }
    });
    function questionsDisplay(num) {
        if (num > 9) {
            $("#ans").val(correctAns);
            $("#send").click();
        }
        $("#ques").text(questions[num].question);
        for (var i = 0; i < 4; i++) {
            option = "#opt" + (i + 1);
            $("#opt" + (i + 1)).text(questions[num].option[i]);
        }
    }
    $("#quiz-btn").on('click', function () {
        if (questions[questionNumber].option[Number($('input[name=optradio]:checked').val()) - 1] === questions[questionNumber].answer) {
            correctAns++;
        }
        questionNumber++;
        $('input[name=optradio]:checked').prop('checked', false);
        questionsDisplay(questionNumber);
    });
    // // saveAs(canvas.toDataURL());
    // var base64ImageContent = imgCanvas.replace(/^data:image\/(png|jpg);base64,/, "");
    // var blob = base64ToBlob(base64ImageContent, 'image/png');
    // console.log(Object.keys(blob));
    // var formData = new FormData();
    // // formData.append('picture', blob);
    // formData.append('username', 'Chris');
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    // $.post("/apps/name", { blob: blob, time: "2pm" });
    // // $.ajax({
    // //     url: "/apps/name",
    // //     type: "POST",
    // //     data: formData,
    // //     cache: false,
    // //     contentType: false,
    // //     processData: false,
    // // })
    // //     .done(function (e) {
    // //         console.log('done!');
    // //     });
});
