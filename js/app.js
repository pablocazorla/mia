// PCAZORLA
;
(function($) {
	'use strict';
	var pcazorla = function() {

		// BROWSER DETECTION
		var browser = {},
			uAgent = navigator.userAgent || navigator.vendor || window.opera,
			ua = uAgent.toLowerCase();
		browser.mozilla = /mozilla/.test(ua) && !/webkit/.test(ua);
		browser.webkit = /webkit/.test(ua);
		browser.opera = /opera/.test(ua);
		browser.msie = /msie/.test(ua);
		browser.ios = (ua.match(/ipad/i) || ua.match(/iphone/i) || ua.match(/ipod/i));
		browser.android = ua.match(/android/i);

		// STORE
		var $window = $(window),
			$html = $('html'),
			$body = $('body'),
			$scroll = (browser.webkit) ? $window : $html;


		// OBJECTS
		var HEADER = {
			$header: $('#header-main'),
			showed: true,
			transparent: true,
			prevScroll: 99999999,
			currentScroll: 0,
			init: function() {
				this.setStatus().setEv(this);
			},
			show: function() {
				if (!this.showed) {
					this.$header.removeClass('hide');
					this.showed = true;
				}
			},
			hide: function() {
				if (this.showed) {
					this.$header.addClass('hide');
					this.showed = false;
				}
			},
			backTransparent: function() {
				if (!this.transparent) {
					this.$header.removeClass('backcolor');
					this.transparent = true;
				}
			},
			backColor: function() {
				if (this.transparent) {
					this.$header.addClass('backcolor');
					this.transparent = false;
				}
			},
			setStatus: function() {
				this.currentScroll = $scroll.scrollTop();
				if (this.prevScroll < this.currentScroll) { // Down
					this.hide();
				} else if (this.prevScroll > this.currentScroll) { // Up
					this.show();
				}

				if (this.currentScroll < 20) {
					this.backTransparent();
				} else {
					this.backColor();
				}

				this.prevScroll = this.currentScroll;
				return this;
			},
			setEv: function(self) {
				$window.scroll(function() {
					self.setStatus();
				});
			}
		};
		HEADER.init();

		// FUNCTIONS
		var onComplete = function(async) {


			// Gallery Illustration
			$('#gallery-menu').each(function() {

				var $menu = $(this),
					$a = $menu.find('.gm-btn'),
					$figures = $('.gallery figure'),
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

			});
		};
		onComplete(false);



	};
	$('document').ready(pcazorla);
})(jQuery);