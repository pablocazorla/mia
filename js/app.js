// App
PANDORA.open(function($) {
	'use strict';

	// Get page data
	var $pageData = $('#page-data'),
		pageId = $pageData.attr('data-page'),
		resizeSection = function($sec, marginBottom, callback) {
			var mBottom = marginBottom || 0,
				h = PANDORA.$window.height();
			$sec.height(h - mBottom);
			if (typeof callback !== 'undefined') {
				callback(h);
			}
		},


		HOMEPAGE = function() {
			var $presentation = $('#presentation'),
				$presentationHand = $('#presentation-hand'),
				resizeHomeSections = function() {
					resizeSection($presentation, 20, function(h) {

						var top = h / 2 - 570;

						top = (top > 0) ? 0 : top;

						$presentationHand.css('top', top + 'px');
						


					});
				};

			$presentationHand.css('opacity', '1');
			resizeHomeSections();
			PANDORA.ASYNC.resize(resizeHomeSections);
		},



		onComplete = function(async) {

			switch (pageId) {
				case 'home':
					HOMEPAGE();
					break;
				default:
					//
			}

		};

	// FUNCTIONS UNIQUES: syncronic

	// temp
	PANDORA.ASYNC.clearEvents();

	// FUNCTIONS BY PAGE: asyncronic
	onComplete(false);



});