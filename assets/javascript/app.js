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
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=U62sFuIW53IcX3v7NrHAWTKp1gLSZPfx&q=" + cartoonGif + "&limit=25&offset=0&rating=G&lang=en";
	console.log("hello" + cartoonGif);
	$.ajax({
		url : queryURL,
		method : "GET"
	}).done(function(response){
		console.log(response.data.length);
		for(var i =0; i < 4; i++){
			Math.floor(Math.random() * 23 + 1);	//insert math random here to generate random gifs
		var b = $("<img>");
		b.addClass("gifResult");
		b.attr("src", response.data[i].images.downsized.url);
		$("#cartoonsGif").append(b);
	}

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

});