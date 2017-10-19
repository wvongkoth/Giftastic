$(document).ready(function(){
//initial array of cartoons
var topics = ["south park", "family guy", "the simpsons", "spongebob squarepants", "hey arnold", "rugrats"];



$("#addCartoon").click(function(event){
	event.preventDefault();
	var cartoon = $("#cartoon-input").val().trim();
	topics.push(cartoon);
	gifCreator(cartoon);
	renderButtons();
});


renderButtons();
function gifCreator(cartoonGif){
	$("#cartoonsGif").empty();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoonGif + "&offset=" + randomNumber() + "&api_key=U62sFuIW53IcX3v7NrHAWTKp1gLSZPfx&&limit=10";
	$.ajax({
		url : queryURL,
		method : "GET"
	}).done(function(response){
		for(var i =0; i < 8; i++){
			console.log(response);
			var rating = response.data[i].rating;
			var ratingDisplay = $("<p>").text("Rating: " + rating);
			var b = $("<img>");
			b.addClass("gifResult");
			b.attr("src", response.data[i].images.downsized.url);
			b.attr("state", "false");
			b.attr("count", i);
			var c = $("<div>");
			c.addClass("rowDiv");
			c.append(b);
			c.append(ratingDisplay)
			$("#cartoonsGif").append(c);
		}
    $("body").on("click", '.gifResult', function(){

        //Change the image src attribute so we can make the gif animated or static depending on the previous state.
        if($(this).attr("state") === 'false'){
            $(this).attr("src", response.data[$(this).attr("count")].images.downsized.url);
            $(this).attr("state", "true");
        }
        else{
            $(this).attr("src", response.data[$(this).attr("count")].images.fixed_height_still.url);
            $(this).attr("state", "true");
        }
    });	

	})
};

function renderButtons(){

	$("#cartoonButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
			a.addClass("cartoons");
			a.attr("data-cartoon", topics[i]);
			a.text(topics[i]);
			a.click(function(){
				gifCreator($(this).attr("data-cartoon"));
			})
			$("#cartoonButtons").append(a);
		}
};

function randomNumber() {
	return Math.floor((Math.random() * 25) + 1);
}

});