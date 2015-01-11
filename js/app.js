// PCAZORLA
;
(function($) {
	'use strict';

	var softLight = {
		ready: false,
		limit: 5,
		init: function(custom) {
			this.$window = $(window);
			this.reset().setEvents(this);
			return this;
		},
		cl: {
			d: function(el, classToSearch) {
				var classList = el.className.split(' '),
					position = -1;
				if (classToSearch) {
					for (var i = 0; i < classList.length; i++) {
						if (classList[i] === classToSearch) {
							position = i;
						}
					}
				}
				return {
					list: classList,
					position: position
				}
			},
			has: function(el, str) {
				return (this.d(el, str).position !== -1);
			},
			add: function(el, str) {
				var dataClass = this.d(el, str);
				if (dataClass.position === -1) {
					el.className += ' ' + str;
				}
			},
			remove: function(el, str) {
				var dataClass = this.d(el, str);
				if (dataClass.position !== -1) {
					dataClass.list.splice(dataClass.position, 1);
					el.className = dataClass.list.join(' ');
				}
			}
		},
		top: function(el) {
			var winHeight = this.$window.height(),
				elemRect = el.getBoundingClientRect();
			return {
				'top': parseInt(winHeight - elemRect.top),
				'visible': (elemRect.top > 10)
			}
		},
		reset: function() {
			this.ready = false;
			this.elem = [];
			this.l = 0;
			return this;
		},
		set: function(selection) {
			var self = this;
			this.reset();

			this.elem = $(selection).toArray();
			this.l = this.elem.length;

			var newArray = [];

			// setInitialPosition
			for (var i = 0; i < this.l; i++) {
				var el = this.elem[i],
					visible = this.top(el).visible;
				console.log(visible);
				if (visible) {
					this.cl.add(el, 'soft-light-anim');
					newArray.push(el);
				} else {
					this.cl.remove(el, 'soft-light');
				}
			}
			this.elem = newArray;
			this.l = newArray.length;

			setTimeout(function(){
				self.ready = true;
				self.test(70);
			},100);
			
			return this;
		},
		test: function(dc) {
			if (this.ready) {
				var self = this,
					delay = 0,
					delayCount = dc || 150,
					newArray = [];
				for (var i = 0; i < this.l; i++) {
					var el = this.elem[i],
						top = this.top(el).top;
					if (top >= this.limit) {
						delay += delayCount;
						(function(element) {
							setTimeout(function() {
								self.cl.remove(element, 'soft-light');
								setTimeout(function() {
									self.cl.remove(element, 'soft-light-anim');
								}, 600);
							}, delay);
						})(el);
					} else {
						newArray.push(el);
					}
				}
				this.elem = newArray;
				this.l = newArray.length;
			}
			return this;
		},
		setEvents: function(self) {
			this.$window.scroll(function() {
				self.test();
			}).resize(function() {
				self.test();
			});
			return this;
		}
	};

	var onCompleteImage = function(selection) {
		var $img = $(selection).addClass('wait-complete-anim'),
			length = $img.length,
			show = function($i) {
				$i.removeClass('wait-complete');
				(function($t) {
					setTimeout(function() {
						$t.removeClass('wait-complete-anim');
					}, 400);
				})($i);
			};
		setTimeout(function() {
			for (var i = 0; i < length; i++) {
				if ($img.eq(i)[0].complete) {
					show($img.eq(i));
				}
			}
		}, 50);

		$img.load(function() {
			show($(this));
		}).error(function() {
			show($(this));
		});
	};

	var srcwait = function(selection) {
		var $img = $(selection).addClass('wait-complete wait-complete-anim'),
			length = $img.length,
			current = -1,
			next = function() {
				current++;
				if (current < length) {
					var $this = $img.eq(current),
						s = $this.attr('srcwait');
					$this.load(next).error(next);
					$this.attr('srcwait', '');
					$this.attr('src', s);
				}
			}
		next();
	};

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

		softLight.init();

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

			softLight.set('.soft-light');

			srcwait('.srcwait');
			onCompleteImage('.wait-complete');

		};
		onComplete(false);



	};
	$('document').ready(pcazorla);
})(jQuery);