$(document).on('ready', function(){

	// Global variables
	var $undoDelete; // Temporarily stores the most recently deleted quote
	var quoteList = [];
	var quoteCount = 0;

	// Quote constructor
	var Quote = function(author, quote, quoteId, rating){
		this.authorText = author;
		this.quoteText = quote;
		this.quoteId = quoteId;
		this.rating = rating;
		this.html = 
	}

	// Create a quote and store it as an object in the global $quoteList array
	$('.submit-button').on('click', function(){

		// Count++ so that every quote gets a unique dataId
		quoteCount ++;

		var tempAuthorText = $('.author-input').val();
		var tempQuoteText = $('.quote-input').val();
		var tempQuoteId = quoteCount;

		var quoteObject = new Quote(tempAuthorText, tempQuoteText, tempQuoteId, 0)

		quoteObject.html = $('<div class="quote-item" data-quote-id="' + quoteObject.quoteId + '"><p class="quote-text">' + quoteObject.quoteText + '</p><p class="quote-author">' + quoteObject.authorText + '</p><div class="star-container"><i class="fa fa-star-o fa-lg off-star" data-id="1"></i><i class="fa fa-star-o fa-lg off-star" data-id="2"></i><i class="fa fa-star-o fa-lg off-star" data-id="3"></i><i class="fa fa-star-o fa-lg off-star" data-id="4"></i><i class="fa fa-star-o fa-lg off-star" data-id="5"></i></div><p class="delete-tag">delete</p></div><div class="break-div"></div>');

		quoteList.push(quoteObject);

		$('.quote-list-container').prepend(quoteObject.html);
	})


	// Rank quotes descending by rating
	var sortByRating = function(){

		quoteList = _.sortBy(quoteList, 'rating').reverse();

		
		// Delete current quote list and then refill it with the newly ordered list
		$('.quote-list-container').empty();

		quoteList.forEach(function(element){
			$('.quote-list-container').append(element.html);
		});
	}


	// Delete a quote
	$('body').on('click', '.delete-tag', function(){
		$undoDelete = $(this).closest('.quote-item')
		$undoDelete.remove();
	})

	// Undo a deletion
	$('body').on('click', '.undo-button', function(){
		$('.quote-list-container').append($undoDelete);
		$undoDelete = null;
	})

	// Pop-Up a Random Quote
	$('body').on('click', '.random-button', function(){
		var value = quoteList[Math.floor(Math.random() * quoteList.length)];
			console.log(value)
		})

	// Click on Author name for all Quotes by Author
	// Why you no work?
	$('body').on('click', '.quote-author', function(){

		var $author = $(this)

		var authorArray = [];

		quoteList.forEach(function(element){
			if(element.authorText === $author.text()){
				authorArray.push(element);
				console.log(element)
			}
		})

		$('.quote-list-container').empty();

		authorArray.forEach(function(element){
			$('.quote-list-container').append(element.html);
		});

	});

	// Re-sort the list
	$('body').on('click', '.resort-button', function(){
		sortByRating();
	})

	// Starring elements
	$('body').on('click', '.off-star', function(){

		$(this).siblings().andSelf().removeClass('on-star');

		var thisQuoteId = $(this).closest('.quote-item').data('quote-id');

		var starLevel = $(this).data('id');

		quoteList[thisQuoteId-1].rating = starLevel;

		$(this).prevAll().andSelf().addClass('on-star animated bounce');

	})

})

















