$(document).ready(function () {
   
    $('#new_name').on('click', function () {
        console.log('clicked!');
        $('#form').removeClass("d-none");
    });
    $('#change').on('click', function () {
               $.ajax({
            method:"GET",
            url:"http://entertaining--apps.herokuapp.com/static/data/quotes.json",
            
            success:function(quotes){
             var i = Math.floor(Math.random() * 109);
              $('#quote').html(quotes[i].quote);
             
            },
            error:function(error){
                alert('Fetching failed',error);
            }
        });
    });
});
