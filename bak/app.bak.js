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
		$scroll = (BROWSER.webkit) ? $window : $html,
		$contentMain = $('#content-main');

	//Window Events
	var onWindowResize = {},
		onWindowScroll = {};


	/* HEADER : Object
	 * Header show and hide behavior
	 */
	var HEADER = {

		$header: $('#header-main'),
		$btnResMenu: $('#res-menu-btn'),
		resOpen: false,
		showed: true,
		transparent: true,
		prevScroll: 99999999,
		currentScroll: 0,
		init: function() {
			// Clear
			onWindowScroll.headerStatus = null;
			this.$resHeader = this.$header.add($('#dim-header'));
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
		resMenuOpen: function() {
			if (!this.resOpen) {
				this.$resHeader.addClass('res-open');
				this.resOpen = true;
			}
		},
		resMenuClose: function() {
			if (this.resOpen) {
				this.$resHeader.removeClass('res-open');
				this.resOpen = false;
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
			var self = this;
			this.$btnResMenu.click(function() {
				self.resMenuOpen();
			});
			$('#dim-header, .resMenuClose').click(function() {
				self.resMenuClose();
			});

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
				hash = null,
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
					if (hash !== null) {
						url += '#' + hash;
					}
					self.currentUrl = url;
					self.hideBlank(self);

					// On Complete
					onComplete(true, url, hash);
				};

			if (url !== this.currentUrl) {
				if (url.indexOf('#') !== -1) {
					var arr = url.split('#');
					url = arr[0];
					hash = arr[1];
				}
				HEADER.resMenuClose();
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
	/*
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
	*/
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

	var SOFTSCROLL = {
		$h: $('html,body'),
		$goTop: $('#goto-top'),
		goTopVisible: false,
		moving: false,
		init: function() {
			onWindowScroll.softScrollScroll = function() {
				SOFTSCROLL.detectTopBtn();
			};
			var self = this;
			this.$goTop.click(function() {
				self.anim(0, 750);
			});



			return this.set();
		},
		detectTopBtn: function() {
			var s = $scroll.scrollTop(),
				h = $window.height();
			if (!this.goTopVisible && s > h) {
				this.$goTop.fadeIn(260);
				this.goTopVisible = true;
			}
			if (this.goTopVisible && s <= h) {
				this.$goTop.fadeOut(260);
				this.goTopVisible = false;
			}
		},
		set: function(context) {
			this.detectTopBtn();
			var ctx = context || '',
				self = this;
			$(ctx + 'a').click(function(e) {
				var url = $(this).attr('href');
				if (url.indexOf('#') === 0) {
					e.preventDefault();
					self.moveTo(url);
				}
			});
			return this;
		},
		moveTo: function(sel) {
			var self = this;
			if (!this.moving) {
				$(sel).eq(0).each(function() {
					var offY = parseInt($(this).offset().top);
					self.anim(offY, 1200, sel);
				});
			}
		},
		anim: function(posY, vel, sel) {
			var self = this,
				sl = sel || '';
			this.moving = true;
			this.$h.animate({
				'scrollTop': posY + 'px'
			}, vel, function() {
				self.moving = false;
				window.location.hash = sl;

			});
		},
		startFrom: function(sel) {
			window.location.hash = sel;
		}
	};

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
				h = parseInt($window.height() - 0),
				mod = w / h,
				imgW, imgH, top, left;

			if (mod >= this.imgMod) {
				imgW = w;
				imgH = parseInt(w / this.imgMod);

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
			if (this.$aboutImg[0].complete) {
				this.setSizePresentation();
			} else {
				var self = this;
				this.$aboutImg.load(function() {
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
	};

	var PRETTYPRE = {
		set: function() {
			var somePre = false;
			$('pre').not('.no-print').each(function() {
				var $this = $(this).addClass('prettyprint');
				$this.text($this.html());
				somePre = true;
			});
			if (somePre) {
				$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert');
			}
		}
	};

	var WIPSLIDER = {
		init: function() {
			var $wip = $('.wipSlider');
			if ($wip.length > 0) {
				$.getScript(baseTemplateURL + '/js/libs/jquery.wipSlider.min.js', function() {
					$wip.wipSlider();
				});
			}
		}
	};
	var IMAGEFILTERS = {
		desaturate: .2,
		blur: 4,
		set: function() {
			var filters = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="invisible">';

			// SVG DESATURATE
			//filters += '<filter id="greyscale"><feColorMatrix in="SourceGraphic" type="saturate" values="' + this.desaturate + '" /></filter>';

			// SVG BLUR
			filters += '<filter id="blur"> <feGaussianBlur stdDeviation="'+ this.blur +'" /> </filter>';

			filters += '</svg><style type="text/css">';

			// STYLE DESATURATE
			//filters += 'img.desaturate {filter: url(#greyscale);-webkit-filter: grayscale(' + this.desaturate + '),blur('+this.blur+'px);-webkit-filter: grayscale(' + (100 * this.desaturate) + '%),blur('+this.blur+'px);-moz-filter: grayscale(' + (100 * this.desaturate) + '%),blur('+this.blur+'px);filter: gray, blur; filter: grayscale(' + (100 * this.desaturate) + '%),;}';

			// STYLE BLUR
			filters += 'img.blur { filter: url(#blur); -webkit-filter: blur('+this.blur+'px); -moz-filter: blur('+this.blur+'px); filter: blur('+this.blur+'px); filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius="'+this.blur+'"); }';

			filters += '</style>';

			$contentMain.append(filters);
		}
	};

	/* onComplete : Function
	 * It runs when load article content
	 */
	var onComplete = function(async, url, hash) {
		var $data = $('#page-data'),
			dataMenu = $data.attr('data-menu'),
			pageId = $data.attr('data-page');

		if (async) {
			LOADER.setLinks('#content-main ');
			SOFTSCROLL.set('#content-main ');

			$('#content-main .bubble').bubble();
		}

		IMAGEFILTERS.set();

		if (hash !== null) {
			SOFTSCROLL.startFrom(hash);
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
			case 'single-design':
				PRETTYPRE.set();
				break;
			case 'single':
				//COMMENTS.validate();
				WIPSLIDER.init();
				PRETTYPRE.set();
				DISQCOMMENTS.set(url);
				break;
			case 'about':
				ABOUT.init();
				break;
			default:
				//
		}
	};

	/*
	 * INIT
	 */
	LOADER.init().setLinks();
	SOFTSCROLL.init();
	HEADER.init();
	MENU.init();
	SOFTLIGHT.init();
	onComplete(false, window.location.href, window.location.hash.substring(1));

	$('.bubble').bubble();

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