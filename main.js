$(document).on('ready', function(){

	// Global variables
	var $undoDelete; // Temporarily stores the most recently deleted quote
	var $quoteList = [];
	var quoteCount = 0;

	// Ranking method for $quoteList
	$quoteList.sortByRating = function(){

		return _.sortBy(this, 'rating').reverse();

	}

	var Quote = function(author, quote, quoteId, rating){
		this.authorText = author;
		this.quoteText = quote;
		this.quoteId = quoteId;
		this.rating = rating;
	}

	// Create a quote and store it as an object in the global $quoteList array
	$('.submit-button').on('click', function(){

		// Count++ so that every quote gets a unique dataId
		quoteCount ++;

		var tempAuthorText = $('.author-input').val();
		var tempQuoteText = $('.quote-input').val();
		var tempQuoteId = quoteCount;


		var quoteObject = new Quote(tempAuthorText, tempQuoteText, tempQuoteId, 0)

		quoteObject.html = $('<div class="quote-item" data-quote-id="' + quoteObject.quoteId + '"><p class="quote-text">' + quoteObject.quoteText + '</p><p class="quote-author">' + quoteObject.authorText + '</p><div class="star-container"><i class="fa fa-star-o fa-lg off-star" data-id="1"></i><i class="fa fa-star-o fa-lg off-star" data-id="2"></i><i class="fa fa-star-o fa-lg off-star" data-id="3"></i><i class="fa fa-star-o fa-lg off-star" data-id="4"></i><i class="fa fa-star-o fa-lg off-star" data-id="5"></i></div><p class="delete-tag">delete</p><div class="break-div"></div></div>');

		$quoteList.push(quoteObject);

		// Sort the list descending by rating
		// $quoteList.sortByRating();

		// Delete current quote list and refill it with the newly ordered list
		$('.quote-list-container').empty();

		$quoteList.sortByRating().forEach(function(element){
			$('.quote-list-container').append(element.html);
			// $(element.html).hide().slideDown(500);
		})

	})

	// Delete a quote
	$('body').on('click', '.delete-tag', function(){
		$undoDelete = $(this).closest('.quote-item')
		$undoDelete.remove();


	})

	// Undo a deletion
	$('body').on('click', '.undo-button', function(){
		$('.quote-list-container').append($undoDelete);
		$undoDelete = null;

		$('.quote-list-container').empty();
		
		$quoteList.sortByRating().forEach(function(element){
			$('.quote-list-container').append(element.html);
		})
	})

	// Starring elements
	$('body').on('click', '.off-star', function(){


		$(this).siblings().andSelf().removeClass('on-star');

		var thisQuoteId = $(this).closest('.quote-item').data('quote-id');

		var starLevel = $(this).data('id');

		$quoteList[thisQuoteId-1].rating = starLevel;

		$(this).prevAll().andSelf().addClass('on-star animated bounce');


		$('.quote-list-container').empty();
		
		$quoteList.sortByRating().forEach(function(element){
			$('.quote-list-container').append(element.html);
		})
	})

})

















