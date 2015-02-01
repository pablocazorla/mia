/* Bubble Plugin
 * @author: Pablo Cazorla
 * @date: 20/01/2015
 */
(function($) {
	$.fn.bubble = function() {
		return this.each(function() {
			var $this = $(this),
				title = $this.attr('title');

			if (typeof title !== 'undefined' && title !== '') {
				var position = $this.css('position'),
					$msg = $('<span class="bubble-msg">' + title + '</span>');
				$this.attr('title', '').append($msg);
				if (position === 'static') {
					$this.css('position', 'relative');
				}
			}
		});
	};
})(jQuery);

// App
PANDORA.open(function($) {
	'use strict';

	// Get page data
	var $pageData,
		pageId = 'home',

		resizeSection = function($sec, marginBottom, callback, minHeight) {
			var mBottom = marginBottom || 0,
				mHeight = minHeight || false,
				h = PANDORA.$window.height();

			if (mHeight) {
				$sec.css('min-height', h - mBottom + 'px');
			} else {
				$sec.height(h - mBottom);
			}

			if (typeof callback !== 'undefined') {
				callback(h);
			}
		},
		goTopBtn = function() {

			var visible = false,
				$goTop = $('#goto-top'),
				detect = function() {
					var s = PANDORA.$scroll.scrollTop(),
						h = PANDORA.$window.height(),
						duration = 260;
					if (!visible && s > h) {
						$goTop.fadeIn(duration);
						visible = true;
					}
					if (visible && s <= h) {
						$goTop.fadeOut(duration);
						visible = false;
					}
				};
			detect();
			PANDORA.$window.scroll(detect).resize(detect);
		},

		HOMEPAGE = function() {
			var $presentation = $('#presentation'),
				$presentationHand = $('#presentation-hand'),
				presentationHandHeight = 330,
				presentationHandShow = true,

				$illustration = $('#illustration'),
				$blog = $('#blog'),

				$aboutMe = $('#about-me'),
				$aboutMeText = $('#about-text'),
				aboutMeMarginBottom = 30,

				aboutMeImgFixer = PANDORA.FIXIMAGE({
					imageModule: 192 / 94,
					$image: $('#about-img'),
					$container: $aboutMe
				}),
				resizeHomeSections = function() {
					resizeSection($presentation, 20, function(h) {
						var top = h / 2 - 570;
						top = (top > 0) ? 0 : top;
						if (presentationHandShow && top < -presentationHandHeight) {
							$presentationHand.hide();
							presentationHandShow = false;
						}
						if (!presentationHandShow && top > -presentationHandHeight) {
							$presentationHand.show();
							presentationHandShow = true;
						}
						$presentationHand.css('top', top + 'px');
					});
					resizeSection($illustration, 0, PANDORA.empty, true);
					resizeSection($blog, 0, PANDORA.empty, true);
					resizeSection($aboutMe, aboutMeMarginBottom, function(h) {
						aboutMeImgFixer.adjust();

						var mar = $aboutMeText.height() / 2;
						$aboutMeText.css('margin-top', '-' + mar + 'px');
					});
				};

			$presentationHand.css('opacity', '1');
			$presentation.addClass('presentation-visible');
			$('#about-to-contact').show();
			resizeHomeSections();

			// Set Menu to local
			var menuList = ['illustration', 'design', 'blog', 'about-me'];
			for (var i = 0; i < menuList.length; i++) {
				$('.' + menuList[i] + '-menu').attr('href', '#' + menuList[i]);
			}

			PANDORA.ASYNC.resize(resizeHomeSections);
		},

		onComplete = function(async) {
			$pageData = $('#page-data');
			pageId = $pageData.attr('data-page');

			var context = (async) ? '#content-main ' : '';

			PANDORA.SOFTLIGHT.select(context);
			PANDORA.IMAGESEQUENCE.load();

			$(context + '.bubble').bubble();

			switch (pageId) {
				case 'home':
					HOMEPAGE();
					break;
				default:
					//
			}
			PANDORA.SOFTSCROLL.selectLinks(context, 70);
		};

	// FUNCTIONS UNIQUES: syncronic
	// header, footer
	PANDORA.SOFTSCROLL.goByHash();
	goTopBtn();

	// temp , debe estar antes de LOAD
	PANDORA.ASYNC.clearEvents();

	// FUNCTIONS BY PAGE: asyncronic
	onComplete(false);



});