
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
       		var largeImage = res.photos;
       		$.each(res.photos.photo, function(i, item) {
       			var image = item;
	   			var urlDefault = 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '.jpg';
	   			var srcLarge = 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '_b.jpg'
	   			var photoTitle = image.title;
	   			var photoNumber = image.id;
	   			$('.imageContainer').append('<a href="#" class="thumbLink" data-name="' + photoTitle + '" data-number="' + photoNumber + '" data-large="' + srcLarge + '" ><div class="galleryItem" data-name="' + photoTitle + '" data-number="' + photoNumber + '" data-large="' + srcLarge + '" style="background-image:url(' + urlDefault + ');"><p class="caption">'+ photoTitle +'</p></div></a>');
	       	});
       		// Initiate Display Functions
	   		app.isotope();
	   		app.fancy();
       	}
	}); 
}

// ISOTOPE 

app.isotope = function() {
	$('.imageContainer').isotope({
		// options for isotope
		itemSelector: '.thumbLink',
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
	// Buttons for sorting
	$('.sort-by-button-group').on( 'click', 'button', function() {
	  var sortByValue = $(this).attr('data-sort-by');
	  $('.imageContainer').isotope({ sortBy: sortByValue });
	});
}

// FANCYBOX

app.fancy = function() {
	$(".galleryItem").on("click", function(){
		var name = $(this).data('name');
		var srcLarge = $(this).data('large');
		$('.main').append('<a href="#" class="fancy"><div class="fancyOverlay"><div class="fancyImage"><img src="' + srcLarge + '"></div></div></a>');
		// $('.galleryItem').addClass('selected');
		$('a.fancy').on("click", function(e){
			e.preventDefault();
			$('.main a.fancy').css('display','none');
		});
	});
}

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