$(document).ready(function () {
   
    $('#new_name').on('click', function () {
        console.log('clicked!');
        $('#form').removeClass("d-none");
    });
    $('#change').on('click', function () {
               $.ajax({
            method:"GET",
            url:"/static/data/quotes.json",
            
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
