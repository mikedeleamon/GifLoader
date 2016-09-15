



// Initial array of movies
    var gifbutts = [];
    var gifNum = 0;

    // ========================================================

    // Generic function for capturing the movie name from the data-attribute
    function alertgifName(){
        var gifName = $(this).data("name");

        alert(gifName);
    }

    // ========================================================

    // Generic function for displaying movie data 
    function renderButtons(){ 

        // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
        $('#gifView').empty();

        // Loops through the array of movies
        for (var i = 0; i < gifbutts.length; i++){

            // Then dynamicaly generates buttons for each movie in the array

            // Note the jQUery syntax here... 
            var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            a.addClass('gif');
            a.addClass("btn-success") // Added a class 
            a.attr('data-name', gifbutts[i]); // Added a data-attribute
            a.attr('data-num',gifNum);
            a.text(gifbutts[i]); // Provided the initial button text
            $('#gifView').append(a); // Added the button to the HTML
            gifNum++// increment gifNum
        }
    }

    // ========================================================

    // This function handles events where one button is clicked
    $('#addgif').on('click', function(){

        // This line of code will grab the input from the textbox
        var gif = $('#gif-input').val().trim();

        // The gif from the textbox is then added to our array
        gifbutts.push(gif);
        
        // Our array then runs which handles the processing of our gif array
        renderButtons();

        return false;
})

function renderGifs(that){

     
         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + that + "&api_key=dc6zaTOxFJmzC&limit=12";

        $.ajax({
                url: queryURL,
                method: 'GET'
             })
             .done(function(response) {
                
                 var results = response.data;

                 for (var i = 0; i < results.length; i++) {
                      //creates div 
                    var gifDiv = $('<div>');
                    gifDiv.addClass("item-"+i);
                    gifDiv.addClass("col-lg-3");
                    gifDiv.attr('data-state',animate);
                    //has a rating for the result
                    var rating = results[i].rating;
                    //creates p tag that would display rating
                    //var para = $('<p>').text("Rating: " + rating);
                    // creates image tag
                    var personImage = $('<img>');
                    //gives ith result source attr and fixes the height
                    personImage.attr('src', results[i].images.fixed_height.url);
                    //puts rating and img
                    //gifDiv.append(para);
                    gifDiv.append(personImage);
                    //prepend gifs
                    $('#gifsAppearHere').prepend(gifDiv);
                }
            })
}

$(document.body).on('click','.gif', function() {
    
    // how we find the gif we're looking for
       
$("gifsAppearHere").empty();
var p = $(this).data('name');
                    
    renderGifs(p);
               return false;
        })



// pauses/starts gyphs that were created

$(document.body).on('click',.item, function(){
                     var state = $(this).attr('data-state')

            if (state=='still'){
                 //changes state
                 $(this).attr('src', $(this).data('animate'))
                 //stores state change
                 $(this).attr('data-state','animate')
             }
             else if(state=='animate'){
                 $(this).attr('src', $(this).data('still'))
                 $(this).attr('data-state','still')

             }
 })

