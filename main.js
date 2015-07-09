$(document).on('ready', function(){

	// Global variables
	var $undoDelete; // Temporarily store the most recently deleted quote
	var $quoteList = [];
	var quoteCount = 0;

	// Ranking method for $quoteList
	$quoteList.sortByRating = function(){
		return _.sortBy(this, 'rating').reverse();
	}

	var Quote = function(author, quote, quoteId, rating){
		this.author = author;
		this.quote = quote;
		this.quoteId = quoteId;
		this.rating = rating;
	}

	// Create a quote and store it as an object in the global $quoteList array
	$('.submit-button').on('click', function(){

		var itemObject = {};
		quoteCount ++;

		quoteId = quoteCount;
		quoteText = $('.quote-input').val();
		authorText = $('.author-input').val();

		var itemObject = new Quote(authorText, quoteText, quoteId, 0)

		itemObject.html = '<div class="quote-item" data-quote-id="' + quoteCount + '"</data->><p class="quote-text">' + itemObject.quoteText + '</p><p class="quote-author">' + itemObject.authorText + '</p><div class="star-container"><i class="fa fa-star-o fa-lg off-star" data-id="1"></i><i class="fa fa-star-o fa-lg off-star" data-id="2"></i><i class="fa fa-star-o fa-lg off-star" data-id="3"></i><i class="fa fa-star-o fa-lg off-star" data-id="4"></i><i class="fa fa-star-o fa-lg off-star" data-id="5"></i></div><p class="delete-tag">delete</p><div class="break-div"></div></div>';
		$quoteList.push(itemObject);

		// Sort the list descending by rating
		$quoteList.sortByRating();

		// Delete current quote list and refill it with the newly ordered list
		$('.quote-list-container').empty();

		$quoteList.forEach(function(element){
			$('.quote-list-container').append(element.html);
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
	})

	// Starring elements
	$('body').on('click', '.off-star', function(){
		$(this).prevAll().andSelf().addClass('on-star');
		$(this).
	})

	console.log($quoteList);
})

















