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
		pageMenu,
		pageId = 'home',

		$header = $('#header-main'),

		HEADER = {
			limitToHide: 0,
			isHome: false,
			sections: ['illustration', 'design', 'blog', 'about-me', 'contact'],
			backColors: {
				'illustration': false,
				'design': true,
				'blog': true,
				'about-me': false,
				'contact': false
			},
			current: function(str) {
				$('.main-menu a').removeClass('current');
				$('.' + str + '-menu').addClass('current');
				if (this.backColors[str]) {
					$header.addClass('white');
				} else {
					$header.removeClass('white');
				}
			},
			setCurrentByScroll: function() {
				var sec = [],
					i, l = this.sections.length,
					headerVisible = true;
				if (this.isHome) {
					sec.push({
						'$e': $('#what-i-do'),
						'name': 'what-i-do'
					});
					headerVisible = false;
				}



				for (i = 0; i < l; i++) {
					var $elem = $('#' + this.sections[i]);
					if ($elem.length > 0) {
						sec.push({
							'$e': $elem,
							'name': this.sections[i]
						});
					}
				}

				var len = sec.length,
					currentMenu = 'none',
					newMenu,
					nearValue,
					onChangeSec = function() {
						nearValue = 9999999;
						newMenu = '';
						for (var i = 0; i < len; i++) {
							var top = Math.abs(sec[i]['$e'][0].getBoundingClientRect().top);
							if (top < nearValue) {
								nearValue = top;
								newMenu = sec[i]['name'];
							}
						}
						if (newMenu !== currentMenu) {
							HEADER.current(newMenu);
							currentMenu = newMenu;
						}
						if (HEADER.isHome) {
							if (currentMenu === 'what-i-do' && headerVisible) {
								$header.addClass('hidden');
								headerVisible = false;
							}

							if (currentMenu !== 'what-i-do' && !headerVisible) {
								$header.removeClass('hidden');
								headerVisible = true;
							}

						}
					};

				PANDORA.ASYNC.scroll(onChangeSec).resize(onChangeSec);
				onChangeSec();
			}
		},

		setLocalMenu = (function() {
			var menuComplete = ['brand', 'illustration', 'design', 'blog', 'about-me'],
				l = menuComplete.length,
				urlCache = {
					'brand': $('.brand').attr('href')
				};
			for (var i = 1; i < l; i++) {
				var n = menuComplete[i]
				urlCache[n] = $('.' + n + '-menu').attr('href');
			}
			var recoverUrl = function() {
				$('.brand').attr('href', urlCache.brand);
				for (var i = 1; i < l; i++) {
					var n = menuComplete[i]
					$('.' + n + '-menu').attr('href', urlCache[n]);
				}
			};
			return function(menuList, noHash) {
				if (menuList.length == 0) {
					recoverUrl();
				} else {
					for (var i = 0; i < menuList.length; i++) {
						var curr = menuList[i],
							$elem;
						if (curr === 'brand') {
							$elem = $('.brand').attr('href', '#content-main');
						} else {
							$elem = $('.' + curr + '-menu').attr('href', '#' + curr);
						}
						$elem.removeClass('no-hash');
						if (noHash) {
							$elem.addClass('no-hash');
						}
					}
				}
			};
		})(),

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

		gallery = function() {
			var $menu = $('#gallery-menu'),
				$a = $menu.find('.gm-btn'),
				$figures = $('.gallery-fig'),
				current = 'all',
				enabled = true,
				// functions
				select = function(cl, $aLink) {
					if (cl != current && enabled) {
						enabled = false;

						if (cl == 'all') {
							$figures.removeClass('hidden');
						} else {
							if (current == 'all') {
								$figures.not('.' + cl).addClass('hidden');
							} else {
								$figures.filter('.' + current).addClass('hidden');
								$figures.filter('.' + cl).removeClass('hidden');
							}
						}
						current = cl;
						setTimeout(function() {
							enabled = true;
							PANDORA.SOFTLIGHT.forceTest();
						}, 600);
						$a.removeClass('current');
						$aLink.addClass('current');
					}
				};
			$a.click(function() {
				var $this = $(this),
					cl = $this.text().toLowerCase().replace(/ /g, '-');
				if (cl.indexOf('all-') != -1) {
					cl = 'all';
				}
				select(cl, $this);
			});
		},

		ILLUSTRATION = function() {
			// Set Menu to local
			setLocalMenu(['illustration'], true);
			gallery();
		},
		DESIGN = function() {
			// Set Menu to local
			setLocalMenu(['design'], true);
			gallery();
		},
		BLOG = function() {
			// Set Menu to local
			setLocalMenu(['blog'], true);
		},
		ABOUTME = {
			init: function() {
				$('#about-to-contact').show();
				this.$aboutMe = $('#about-me');
				this.$aboutMeText = $('#about-text');
				this.aboutMeMarginBottom = 30;
				this.aboutMeImgFixer = PANDORA.FIXIMAGE({
					imageModule: 192 / 94,
					$image: $('#about-img'),
					$container: this.$aboutMe
				});
				// Set Menu to local
				setLocalMenu(['about-me'], true);
				return this;
			},
			resize: function() {
				var self = this;
				resizeSection(self.$aboutMe, self.aboutMeMarginBottom, function(h) {
					self.aboutMeImgFixer.adjust();

					var mar = self.$aboutMeText.height() / 2;
					self.$aboutMeText.css('margin-top', '-' + mar + 'px');
				});
				return this;
			},
			setEvent: function() {
				var self = this;
				PANDORA.ASYNC.resize(function() {
					self.resize();
				});
				return this;
			}
		},

		HOMEPAGE = function() {
			var $presentation = $('#presentation'),
				$presentationHand = $('#presentation-hand'),
				presentationHandHeight = 330,
				presentationHandShow = true,

				$illustration = $('#illustration'),
				$blog = $('#blog');
			ABOUTME.init();

			var resizeHomeSections = function() {
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
				ABOUTME.resize();
			};

			HEADER.isHome = true;
			$presentationHand.css('opacity', '1');
			$presentation.addClass('presentation-visible');
			$('#about-to-contact').show();
			resizeHomeSections();

			// Set Menu to local
			setLocalMenu(['brand', 'illustration', 'design', 'blog', 'about-me'], false);

			PANDORA.ASYNC.resize(resizeHomeSections);
		},

		onComplete = function(async) {
			$pageData = $('#page-data');
			pageId = $pageData.attr('data-page');
			pageMenu = $pageData.attr('data-menu');

			var context = (async) ? '#content-main ' : '';

			HEADER.isHome = false;

			PANDORA.SOFTLIGHT.select(context);
			PANDORA.IMAGESEQUENCE.load();
			setLocalMenu([]);

			$(context + '.bubble').bubble();

			switch (pageId) {
				case 'home':
					HOMEPAGE();
					break;
				case 'illustration':
					ILLUSTRATION();
					break;
				case 'design':
					DESIGN();
					break;
				case 'blog':
					BLOG();
					break;
				case 'about-me':
					ABOUTME.init().resize().setEvent();
					break;
				default:
					//
			}
			HEADER.setCurrentByScroll();
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