
// Defining a few things:

var app = {};

// var app.apiKey = "a5e95177da353f58113fd60296e1d250";
// var app.userId = "132365033@N08";

app.getImages = function(query) {
	$.ajax({
	        url: 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos',
	        type: 'GET',
	        // dataType: "json",
	        data: {
	            api_key: "a5e95177da353f58113fd60296e1d250",
	            user_id: "132365033@N08",
	            format: 'json',
	        		nojsoncallback: 1
	        },
	       	success: function(res) {
	       		console.log(res.photos.photo);
	       		$.each(res.photos.photo, function(i, item) {
	       		var image = item;
	       			console.log(image);
	       		});
	       }
	}); 
}

// app.displayImages = function()





// // // //
//  INIT //
// // // //

app.init = function() {
	app.getImages();
	// app.getBand();

};

// // // // // // //
// DOCUMENT READY //
// // // // // // //

$(function() {
	app.init();
});