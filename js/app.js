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
				resizeHomeSections = function() {
					resizeSection($presentation, 20, function(h) {

						var posBg = h / 2 - 570;

						posBg = (posBg > 0) ? 0 : posBg;

						$presentation.css('background-position', 'center ' + posBg + 'px');



					});
				};

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