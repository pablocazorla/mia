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
		set: function(c) {
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
	};

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
			this.$scrollBtn = $('#h-scroll');
			console.log($html.scrollTop());
			if ($html.scrollTop() < 80) {
				this.scrollBtnShow = true;
				this.$scrollBtn.show();
			}
			this.$scrollBtn.click(function() {
				$('html,body').animate({
					'scrollTop': 500
				}, 600);
			});

			onWindowScroll.scrollBtnEvent = function() {
				HOME.scrollBtnEvent();
			}

			return this;
		},
		scrollBtnEvent: function() {
			if (this.scrollBtnShow) {
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
	};


	var LOADER = {
		duration: 400,
		blanked: true,
		hostUrl: window.location.host,
		currentUrl: window.location.href,
		pushSt: (typeof history !== 'undefined' && typeof history.pushState !== 'undefined'),
		init: function() {
			this.$blank = $('#blank-dimmer');
			this.$loader = $('#loader-line').addClass('to70');
			this.$mainContent = $('#content-main');

			// Hide $blank
			var self = this;
			setTimeout(function() {
				self.hideBlank(self);
			}, 400);
			return this;
		},
		setLinks: function(context) {
			var self = this,
				ctx = context || '';
			if (this.pushSt) {
				$(ctx + 'a:not(.no-async)').click(function(e) {
					var $this = $(this),
						url = $this.attr('href');
					if (url.indexOf(self.hostUrl) !== -1) {
						e.preventDefault();
						self.load(url);
					}
				});
			}
			return this;
		},
		load: function(url) {
			var self = this,
				timer = null,
				changed = false,
				s = (url.indexOf('?') === -1) ? '?' : '&',
				defaultChange = function() {
					window.location.href = url;
				},
				change = function(data) {
					$scroll.scrollTop(0);
					self.$mainContent.html(data);
					var title = $('#hidden-title').text();
					if (title === '') {
						title = document.title;
					} else {
						document.title = title;
					}
					history.pushState(null, title, url);
					self.currentUrl = url;
					self.hideBlank(self);

					// On Complete
					onComplete(true, url);
				};
			if (url !== this.currentUrl) {
				this.showBlank(this);
				if (this.pushSt && url.indexOf(this.hostUrl) !== -1) {
					changed = false;
					$.ajax({
						url: url + s + 'async=1',
						success: function(data) {
							timer = setInterval(function() {
								if (self.blanked && !changed) {
									clearInterval(timer);
									timer = null;
									changed = true;
									change(data);
								}
							}, 50);
						},
						error: defaultChange
					});
				} else {
					defaultChange();
				}
			}
		},
		showBlank: function(self) {
			this.$loader.removeClass('hidden').addClass('to70');
			this.$blank.fadeIn(this.duration, function() {
				self.blanked = true;
			});
		},
		hideBlank: function(self) {
			this.$loader.removeClass('to70').addClass('to100').addClass('hidden');
			this.$blank.fadeOut(this.duration, function() {
				self.$loader.removeClass('to100');
				self.blanked = false;
			});
		}
	};

	var SOCIALSHARE = {
		shareLinks: {
			'facebook': {
				'url': 'https://www.facebook.com/sharer/sharer.php?u='
			},
			'twitter': {
				'url': 'https://twitter.com/home?status=',
				'descriptionSeparator': ':%20',
				'width': '635',
				'height': '430'
			},
			'google': {
				'url': 'https://plus.google.com/share?url=',
				'width': '560',
				'height': '580'
			},
			'pinterest': {
				'url': 'https://pinterest.com/pin/create/button/?url=',
				'width': '1000',
				'height': '600'
			}
		},
		setLinks: function() {
			var self = this;
			$('#content-main a.share').click(function(e) {
				e.preventDefault();
				self.share($(this));
			});
		},
		share: function($a) {
			var data = $.parseJSON($.trim($a.attr('data-share').replace(/\'/g, '"')));
			if (data != null) {
				data = $.extend({
					'on': '',
					'media': '',
					'description': ''
				}, data);
				var url = window.location.href,
					on = data['on'],
					cfg = $.extend({
						'width': '600',
						'height': '360',
						'mediaSeparator': '&media=',
						'descriptionSeparator': '&description=',
						'title': 'Share'
					}, this.shareLinks[on]),
					urlShare,
					windowWidth = $window.width(),
					heightWidth = $window.height(),
					w = parseInt(cfg['width']),
					h = parseInt(cfg['height']);
				if (windowWidth < (w + 30)) {
					w = windowWidth - 30;
					cfg['width'] = w;
				}
				if (heightWidth < (h + 60)) {
					h = heightWidth - 60;
					cfg['height'] = h;
				}
				var left = Math.round((windowWidth - w) / 2),
					top = Math.round((heightWidth - h) / 2);

				data['description'] = encodeURI(data['description'].replace(/\|/g, "'"));

				switch (on) {
					case 'pinterest':
						urlShare = cfg['url'] + url + cfg['mediaSeparator'] + data['media'] + cfg['descriptionSeparator'] + data['description'];
						break;
					case 'twitter':
						urlShare = cfg['url'] + data['description'] + cfg['descriptionSeparator'] + url;
						break;
					default:
						urlShare = cfg['url'] + url;
				};
				window.open(urlShare, cfg['title'], 'width=' + cfg['width'] + ', height=' + cfg['height'] + ',left=' + left + ',top=' + top);
			}
		}
	};

	var COMMENTS = {
		validate: function() {
			var $fieldsets = $('#commentform fieldset.validate'),
				isValid = function() {
					var v = true;
					$fieldsets.each(function() {
						var $this = $(this).removeClass('error'),
							$inp = $this.find('input,textarea'),
							min = $this.attr('data-min'),
							val = $inp.val();

						if (val.length < 3) {
							v = false;
							$this.addClass('error');
							$inp.focus();
						} else {
							if ($this.hasClass('email')) {
								if (val.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) == -1) {
									v = false;
									$this.addClass('error');
									$inp.focus();
								}
							}
						}
					});
					return v;
				};
			$('#submit').click(function(e) {
				var v = isValid();
				if (!v) {
					e.preventDefault();
				}
			});
			$('#clearFields').click(function(e) {
				e.preventDefault();
				$fieldsets.removeClass('error').find('input,textarea').val('').eq(0).focus();
			});
		}
	};
/*
	var GMAPS = {
		init: function() {
			$.getScript(baseTemplateURL + '/js/libs/gmaps.min.js', function() {
				var map = new GMaps({
					el: '#map-goo',
					lat: -32.8730775,
					lng: -68.8373294,
					zoom: 5,
					zoomControl: true,
					zoomControlOpt: {
						//	style: 'SMALL',
						position: 'TOP_LEFT'
					},
					scrollwheel: false,
					mapTypeControl: false,
					streetViewControl: false,
					panControl: false,
					styles: [{
						"featureType": "all",
						"stylers": [{
							"saturation": -60
						}, {
							"gamma": 0.8
						}]
					}]
				});
				map.addMarker({
					lat: -32.8730775,
					lng: -68.8373294,
					title: 'My home',
					icon: baseTemplateURL + '/img/map-marker.png',
					infoWindow: {
						content: '<h5 class="infomap">This is <b>Mendoza, Argentina</b></h5><p class="infomap">I work and live here, the most beautiful city in the world ;-)</p>',
						maxWidth: 720
					}
				});
			});
		}
	};
*/
	var ABOUT = {
		init: function() {
			// Clear
			onWindowResize.aboutResize = null;
			this.$aboutPresentation = $('.about-presentation');
			this.$aboutText = $('#about-text');
			this.$aboutImg = $('#about-img');
			this.imgMod = 192 / 94;
			this.setEvents();
		},
		setSizePresentation: function() {
			var w = $window.width(),
				h = parseInt($window.height() - 40),
				mod = w / h,
				imgW, imgH, top, left;

			if (mod >= this.imgMod) {
				imgW = w;
				imgH = parseInt(w/this.imgMod);

				top = (h - imgH) / 2;
				left = '0';
			} else {
				imgW = parseInt(this.imgMod * h);
				imgH = h;
				top = '0';
				left = (w - imgW) / 2;
			}
			this.$aboutImg.css({
				width: imgW + 'px',
				height: imgH + 'px',
				top: top + 'px',
				left: left + 'px'
			});
			this.$aboutPresentation.height(h);
			var mar = this.$aboutText.height() / 2 - 30;
			this.$aboutText.css('margin-top', '-' + mar + 'px');

			return this;
		},
		setEvents: function() {
			if(this.$aboutImg[0].complete){
				this.setSizePresentation();
			}else{
				var self = this;
				this.$aboutImg.load(function(){
					self.setSizePresentation();
				});
			}


			onWindowResize.aboutResize = function() {
				ABOUT.setSizePresentation();
			};
		}
	};

	var DISQCOMMENTS = {
		set: function(url) {
			if (typeof DISQUS !== 'undefined') {
				var idPost = $('.article-main').attr('data-id');
				DISQUS.reset({
					reload: true,
					config: function() {
						this.page.identifier = idPost;
						this.page.url = url;
					}
				});
			} else {
				var dsq = document.createElement('script');
				dsq.type = 'text/javascript';
				dsq.async = true;
				dsq.src = '//pcazorla.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			}
		}
	}

	/* onComplete : Function
	 * It runs when load article content
	 */
	var onComplete = function(async, url) {
		var $data = $('#page-data'),
			dataMenu = $data.attr('data-menu'),
			pageId = $data.attr('data-page');

		if (async) {
			LOADER.setLinks('#content-main ');
		}

		MENU.set(dataMenu);
		IMAGESOFTLOAD.set();
		SOFTLIGHT.set();
		SOCIALSHARE.setLinks();

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
			case 'single':
				//COMMENTS.validate();
				DISQCOMMENTS.set(url);
				break;
			case 'about':
				ABOUT.init();
				break;
			default:
				//
		}
		if (async) {
			//DISQUS.reset();
		}

	};

	/*
	 * INIT
	 */
	LOADER.init().setLinks();
	HEADER.init();
	MENU.init();
	SOFTLIGHT.init();
	onComplete(false,window.location.href);

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