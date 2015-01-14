// PCAZORLA
var pcazorla = function() {

	'use strict';

	/* BROWSER : Object
	 * Store browser type
	 */
	var BROWSER = {},
		uAgent = navigator.userAgent || navigator.vendor || window.opera,
		ua = uAgent.toLowerCase();
	BROWSER.mozilla = /mozilla/.test(ua) && !/webkit/.test(ua);
	BROWSER.webkit = /webkit/.test(ua);
	BROWSER.opera = /opera/.test(ua);
	BROWSER.msie = /msie/.test(ua);
	BROWSER.ios = (ua.match(/ipad/i) || ua.match(/iphone/i) || ua.match(/ipod/i));
	BROWSER.android = ua.match(/android/i);

	// STORE JQUERY SELECTIONS
	var $window = $(window),
		$html = $('html'),
		$body = $('body'),
		$scroll = (BROWSER.webkit) ? $window : $html;

	//Window Events
	var onWindowResize = {},
		onWindowScroll = {};


	/* HEADER : Object
	 * Header show and hide behavior
	 */
	var HEADER = {

		$header: $('#header-main'),
		showed: true,
		transparent: true,
		prevScroll: 99999999,
		currentScroll: 0,
		init: function() {
			// Clear
			onWindowScroll.headerStatus = null;
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
		setEv: function() {
			onWindowScroll.headerStatus = function() {
				HEADER.setStatus();
			};
		}
	};

	/* MENU : Object
	 *
	 */
	var MENU = {
		current: '',
		init: function() {
			this.$a = $('#main-menu a');
		},
		set: function(str) {
			var c = str || this.current;
			if (c !== this.current) {
				this.$a.removeClass('current').filter('.' + c + '-menu').addClass('current');
				this.current = c;
			}
		}
	};

	/* SOFTLIGHT : Object
	 * Show elements while scroll down
	 */
	var SOFTLIGHT = {
		ready: false,
		limit: 5,
		init: function(custom) {
			// Clear
			onWindowScroll.softLightTest = onWindowResize.softLightTest = null;
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
			var winHeight = $window.height(),
				elemRect = el.getBoundingClientRect();
			return {
				'top': parseInt(winHeight - elemRect.top),
				'visible': (elemRect.top > 10),
				'windowHeight': winHeight
			}
		},
		reset: function() {

			this.ready = false;
			this.elem = [];
			this.l = 0;
			return this;
		},
		set: function() {
			var self = this;
			this.reset();

			this.elem = $('.soft-light').toArray();
			this.l = this.elem.length;

			var newArray = [];

			// setInitialPosition
			for (var i = 0; i < this.l; i++) {
				var el = this.elem[i],
					visible = this.top(el).visible;
				if (visible) {
					this.cl.add(el, 'soft-light-anim');
					newArray.push(el);
				} else {
					this.cl.remove(el, 'soft-light');
				}
			}
			this.elem = newArray;
			this.l = newArray.length;

			setTimeout(function() {
				self.ready = true;
				self.test(70);
			}, 100);

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
		setEvents: function() {
			onWindowScroll.softLightTest = onWindowResize.softLightTest = function() {
				SOFTLIGHT.test();
			};

			return this;
		}
	};

	var IMAGESOFTLOAD = {
		set: function() {
			this.srcwait('.srcwait').onCompleteImage('.wait-complete');
		},
		/* onCompleteImage : Function
		 * Show image after load
		 */
		onCompleteImage: function(selection) {
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
			return this;
		},
		/* srcwait : Function
		 * Load images in secuence; uses onCompleteImage to show every image
		 */
		srcwait: function(selection) {
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
			return this;
		}
	};

	/* GALLERY : Object
	 * Galery menu of sub-categories
	 */
	var GALLERY = {
			init: function() {
				$('#gallery-menu').each(function() {

					var $menu = $(this),
						$a = $menu.find('.gm-btn'),
						$figures = $('#gallery .gallery-fig'),
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
									if (typeof SOFTLIGHT !== 'undefined') {
										SOFTLIGHT.test();
									}
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
			}
		}
		/* HOME : Object
		 *
		 */
	var HOME = {
		timerTitle: null,
		init: function() {
			// Clear
			if (this.timerTitle != null) {
				clearInterval(this.timerTitle);
				this.timerTitle = null;
			}
			onWindowResize.homeResize = null;

			this.$headerHome = $('.header-home');
			this.$slideTitle = $('#slide-title')

			this.setHeight().setTitle().setScrollBtn().homeCreate().setEvents();
			return this;
		},
		setScrollBtn: function() {
			var self = this;
			this.scrollBtnShow = false;
			this.$scrollBtn = $('#h-scroll');console.log($html.scrollTop());
			if($html.scrollTop() < 80){
				this.scrollBtnShow = true;
				this.$scrollBtn.show();
			}
			this.$scrollBtn.click(function(){
				$scroll.animate({
					'scrollTop': 500
				},600);
			});

			onWindowScroll.scrollBtnEvent = function() {
				HOME.scrollBtnEvent();
			}

			return this;
		},
		scrollBtnEvent : function(){
			if(this.scrollBtnShow){		
				this.scrollBtnShow = false;
				this.$scrollBtn.fadeOut(400);
			}
		},
		homeCreate: function() {
			this.pabloPic = $('.pablo-pic')[0];
			this.$sections = $('.home-welcome, .home-create');
			this.homeCreateReady = false;

			this.testHomeCreate();

			onWindowScroll.homeCreateScroll = function() {
				HOME.testHomeCreate();
			}
			return this;
		},
		testHomeCreate: function() {
			if (!this.homeCreateReady) {
				var position = SOFTLIGHT.top(this.pabloPic);

				//console.log(position.top);

				if (position.top > ((2 / 3) * position.windowHeight)) {
					this.$sections.removeClass('pc-init');
					this.homeCreateReady = true;
				}
			}
		},
		setHeight: function() {
			this.$headerHome.height($window.height() - 60);
			return this;
		},
		setTitle: function() {
			var current = 1,
				l = this.$slideTitle.find('span').length,
				duration = 3200,
				self = this,
				change = function() {
					self.$slideTitle.removeClass('show-' + current);
					current++;
					if (current > l) {
						current = 1;
					}
					self.$slideTitle.addClass('show-' + current);
				};
			this.timerTitle = setInterval(change, duration);
			return this;
		},
		setEvents: function() {
			onWindowResize.homeResize = function() {
				HOME.setHeight();
			};
		}
	}


	/* onComplete : Function
	 * It runs when load article content
	 */
	var onComplete = function(async) {
		var $data = $('#page-data'),
			dataMenu = $data.attr('data-menu'),
			pageId = $data.attr('data-page');



		MENU.set(dataMenu);
		IMAGESOFTLOAD.set();
		SOFTLIGHT.set();

		switch (pageId) {
			case 'home':
				HOME.init();
				break;
			case 'archive-illustration':
				GALLERY.init();
				break;
			case 'archive-design':
				GALLERY.init();
				break;
			default:
				//
		}
	};

	/*
	 * INIT
	 */
	HEADER.init();
	MENU.init();
	SOFTLIGHT.init();
	onComplete(false);

	$window.resize(function() {
		for (var a in onWindowResize) {
			if (typeof onWindowResize[a] === 'function') {
				onWindowResize[a]();
			}
		}
	}).scroll(function() {
		for (var a in onWindowScroll) {
			if (typeof onWindowScroll[a] === 'function') {
				onWindowScroll[a]();
			}
		}
	});
};
$('document').ready(pcazorla);