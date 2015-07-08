$(document).on('ready', function(){

	$('.submit-button').on('click', function(){
		var $quoteText = $('.quote-input').val();
		var $authorText = $('.author-input').val();

		var $quoteItem = '<div class="quote-item"><p class="quote-text">' + $quoteText + '</p><p class="quote-author">~ ' + $authorText + '</p><p class="delete-tag">Delete</p></div><div class="break-div"></div>'

		$('.quote-list-container').append($quoteItem);

	})

	$('body').on('click', '.delete-tag', function(){
		
	})

})