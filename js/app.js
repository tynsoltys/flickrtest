
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
	       			var urlDefault = 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '.jpg';
	       			console.log(urlDefault);
	       			var photoTitle = image.title;
	       			var photoNumber = image.id;
	       			$('.imageContainer').append('<div class="galleryItem" data-name="' + photoTitle + '" data-number="' + photoNumber + '" style="background-image:url(' + urlDefault + ');"><p class="caption">'+ photoTitle +'</p>');
	       		});
	       		$('.imageContainer').isotope({
	       		  // options
	       		  itemSelector: '.galleryItem',
	       		  layoutMode: 'fitRows',
	       		  getSortData: {
	       		    name: '[data-name]', // text from querySelector
	       		    number: '[data-number]' // value of attribute
	       		  },
	       		  sortBy: [ 'name', 'number' ],
	       		  sortAscending: {
	       		    name: true,
	       		    number: true
	       		  }
	       		});
	       		$('.sort-by-button-group').on( 'click', 'button', function() {
	       		  var sortByValue = $(this).attr('data-sort-by');
	       		  $('.imageContainer').isotope({ sortBy: sortByValue });
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