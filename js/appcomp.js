// App
// Box
var PANDORA = (function() {
	'use strict';
	// Private
	var opened = false;

	// Utils
	/* BROWSER : Object
	 * Store browser type
	 */
	var BROWSER = {},
		uAgent = navigator.userAgent || navigator.vendor || window.opera,
		ua = uAgent.toLowerCase();
	BROWSER.mozilla = /mozilla/.test(ua) && !/webkit/.test(ua);
	BROWSER.webkit = /webkit/.test(ua);
	BROWSER.opera = /opera/.test(ua);
	BROWSER.msie = /msie/.test(ua) || /trident/.test(ua);
	BROWSER.ios = (ua.match(/ipad/i) || ua.match(/iphone/i) || ua.match(/ipod/i));
	BROWSER.android = ua.match(/android/i);

	var parseData = function(data) {
			var obj = {},
				arr, len, i, attr, prop, val;
			if (data !== '' && data !== undefined && data !== null) {
				arr = data.split(',');
				len = arr.length;
				for (i = 0; i < len; i++) {
					attr = arr[i].split(':');
					prop = $.trim(attr[0]);
					val = parseFloat(attr[1]);
					obj[prop] = val;
				}
			}
			return obj;
		},
		cssfix = (function() {
			var style = document.createElement('dummy').style,
				prefixes = 'Webkit Moz O ms Khtml'.split(' ');
			return function(prop) {

				var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
					props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' '),
					result = null;
				for (var i in props) {
					if (style[props[i]] !== undefined) {
						result = props[i];
						break;
					}
				}
				return result;
			};
		})();

	return {
		open: function(callback) {
			//var callback = callback || function(){};
			if (typeof jQuery !== 'undefined' && !this.opened) {
				jQuery('document').ready(function($) {

					// Store
					PANDORA.$window = $(window);
					PANDORA.$html = $('html,body');
					PANDORA.$scroll = (PANDORA.BROWSER.webkit) ? PANDORA.$window : PANDORA.$html;

					// Open the box: do the magic
					PANDORA.opened = true;



					// Execute callback
					callback($);
				});
			}
			return this;
		},
		close: function() {
			opened = false;
			return this;
		},
		isOpened: function() {
			return opened;
		},

		// Utils 
		BROWSER: BROWSER,
		parseData: parseData,
		cssfix: cssfix,
		empty: function() {}
	}
})();

/* Bubble Plugin
 * @author: Pablo Cazorla
 * @date: 20/01/2015
 */
(function($) {
	$.fn.bubble = function() {
		return this.each(function() {
			var $this = $(this).addClass('bubble'),
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
// PANDORA ASYNC

(function() {
	'use strict';
	var initialized = false,
		onWindowResize = {},
		onWindowScroll = {},
		counter = 0,
		init = function() {
			// Set window events
			PANDORA.$window.resize(function() {
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

	PANDORA.ASYNC = {
		scroll: function(callback) {
			if (!initialized) {
				init();
			}
			onWindowScroll['asyncFunction' + counter] = callback;
			++counter;
			return this;
		},
		resize: function(callback) {
			if (!initialized) {
				init();
			}
			onWindowResize['asyncFunction' + counter] = callback;
			++counter;
			return this;
		},
		clearEvents: function() {
			onWindowResize = {};
			onWindowScroll = {};
			return this;
		}
	};
})();

// PANDORA SOFTLIGHT

(function() {
	'use strict';
	PANDORA.SOFTLIGHT = {
		delay: 200,
		defaults: {
			x: 0,
			y: 120,
			z: 0,
			scale: 1,
			rotate: 0,
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			from: 50,
			duration: 400,
			delay: 0,
			classSelection: 'softlight'
		},
		config: function(obj) {
			this.defaults = $.extend(this.defaults, obj);
			return this;
		}
	};

	var list = [],
		length = 0,

		initialized = false,
		delay = 0,

		transformFix = PANDORA.cssfix('transform'),
		transitionFix = PANDORA.cssfix('transition'),
		perspectiveFix = PANDORA.cssfix('perspective'),

		test = function(objElem) {

			var winHeight = PANDORA.$window.height(),
				elemRect = objElem.elem.getBoundingClientRect();



			var top = parseInt(winHeight - elemRect.top),
				visible = (top >= objElem.from) ? true : false,
				ready = (top >= winHeight) ? true : false;

			return {
				ready: ready,
				visible: visible
			};
		},
		setInitialPosition = function(elem, data) {
			var objElem = $.extend({
				x: PANDORA.SOFTLIGHT.defaults.x,
				y: PANDORA.SOFTLIGHT.defaults.y,
				z: PANDORA.SOFTLIGHT.defaults.z,
				scale: PANDORA.SOFTLIGHT.defaults.scale,
				rotate: PANDORA.SOFTLIGHT.defaults.rotate,
				rotateX: PANDORA.SOFTLIGHT.defaults.rotateX,
				rotateY: PANDORA.SOFTLIGHT.defaults.rotateY,
				rotateZ: PANDORA.SOFTLIGHT.defaults.rotateZ,
				from: PANDORA.SOFTLIGHT.defaults.from,
				duration: PANDORA.SOFTLIGHT.defaults.duration,
				delay: PANDORA.SOFTLIGHT.defaults.delay
			}, PANDORA.parseData(data));

			// Add elem
			objElem.elem = elem;

			var isReady = test(objElem).ready;
			if (!isReady) {
				//correction of position
				objElem.from -= objElem.y;
				//
				var transformStyle = '',
					setPerspective = false;
				if (objElem.x !== 0) {
					transformStyle += 'translateX(' + objElem.x + 'px)';
				}
				if (objElem.y !== 0) {
					transformStyle += ' translateY(' + objElem.y + 'px)';
				}
				if (objElem.z !== 0) {
					transformStyle += ' translateZ(' + objElem.z + 'px)';
				}
				if (objElem.scale !== 1) {
					transformStyle += ' scale(' + objElem.scale + ')';
				}
				if (objElem.rotate !== 0) {
					transformStyle += ' rotate(' + objElem.rotate + 'deg)';
				} else {
					if (perspectiveFix !== null) {
						if (objElem.rotateX !== 0) {
							transformStyle += ' rotateX(' + objElem.rotateX + 'deg)';
							setPerspective = true;
						}
						if (objElem.rotateY !== 0) {
							transformStyle += ' rotateX(' + objElem.rotateY + 'deg)';
							setPerspective = true;
						}
						if (objElem.rotateZ !== 0) {
							transformStyle += ' rotateX(' + objElem.rotateZ + 'deg)';
						}
					}
				}
				if (setPerspective) {
					objElem.elem.parentNode.style[perspectiveFix] = '1000px';
				}

				objElem.elem.style.opacity = '0';
				objElem.elem.style[transformFix] = transformStyle;
				objElem.elem.style[transitionFix] = 'opacity ' + objElem.duration + 'ms ease-out ' + objElem.delay + 'ms, ' + transformFix + ' ' + objElem.duration + 'ms ease-out ' + objElem.delay + 'ms';
				list.push(objElem);
				length++;
			}
			$(elem).removeClass(PANDORA.SOFTLIGHT.defaults.classSelection);
		},
		show = function(ob) {

			setTimeout(function() {
				ob.elem.style.opacity = '';
				ob.elem.style[transformFix] = '';
				setTimeout(function() {
					ob.elem.style[transitionFix] = '';
				}, ob.duration + ob.delay + 50);
			}, delay);
		},
		onScroll = function() {
			if (length > 0) {
				var remainingList = [],
					i;
				delay = 0;
				for (i = 0; i < length; i++) {
					var objElem = list[i],
						testElem = test(objElem),
						isVisible = testElem.visible,
						isReady = testElem.ready;
					if (isVisible) {
						show(objElem);

						if (isReady) {
							delay = 0;
						} else {
							delay += PANDORA.SOFTLIGHT.delay;
						}
					} else {
						remainingList.push(objElem);
					}
				}
				list = remainingList;
				length = list.length;
			}
		},
		select = function(context) {
			if (PANDORA.opened) {
				var ctx = (typeof context !== 'undefined') ? context : '';

				$(ctx + '.' + PANDORA.SOFTLIGHT.defaults.classSelection).each(function() {
					var data = $(this).attr('data-softlight');
					setInitialPosition(this, data);
				});

				if (!initialized) {
					PANDORA.$window.scroll(onScroll).resize(onScroll);
					initialized = true;
				}
				setTimeout(function() {
					onScroll();
				}, 200);
			}
		},
		forceTest = function() {
			onScroll();
		};

	PANDORA.SOFTLIGHT.select = select;
	PANDORA.SOFTLIGHT.forceTest = forceTest;
})();

// FIX IMAGE

(function() {
	'use strict';
	var fixIm = function(options) {
		return this.init(options);
	};
	fixIm.prototype = {
		init: function(options) {
			this.ready = false;
			this.cfg = $.extend({
				imageModule: 1,
				$image: null,
				$container: null
			}, options);

			if (this.cfg.$image !== null && this.cfg.$container !== null) {
				this.ready = true;
			}
			return this.adjust();
		},
		adjust: function(callback) {
			if (this.ready) {
				var w = parseInt(this.cfg.$container.width()),
					h = parseInt(this.cfg.$container.height()),
					mod = w / h,
					imgW, imgH, top, left;

				if (mod >= this.cfg.imageModule) {
					imgW = w;
					imgH = parseInt(w / this.cfg.imageModule);

					top = parseInt((h - imgH) / 2);
					left = '0';
				} else {
					imgW = parseInt(this.cfg.imageModule * h);
					imgH = h;
					top = '0';
					left = parseInt((w - imgW) / 2);
				}
				this.cfg.$image.css({
					width: imgW + 'px',
					height: imgH + 'px',
					top: top + 'px',
					left: left + 'px'
				});

				if (typeof callback === 'function') {
					callback();
				}
			}
			return this;
		}
	};
	PANDORA.FIXIMAGE = function(options) {
		return new fixIm(options);
	}
})();

// PANDORA IMAGE QUEUE
(function() {
	'use strict';
	var $queue = $(''),
		classSelection = 'img-sequence',
		classTransition = 'img-sequence-anim',
		duration = 400,
		current = -1,
		onSucess = null,
		onError = null,
		onComplete = function($img) {
			$img.removeClass(classSelection);
			setTimeout(function() {
				$img.removeClass(classTransition);
			}, duration + 10);
		},
		next = function() {
			current++;
			if (current < $queue.length) {
				var $this = $queue.eq(current),
					s = $this.attr('data-src');
				$this.load(function() {
					onComplete($this);
					if (typeof onSucess === 'function') {
						onSucess.apply(null, [$this]);
					}
					next();
				}).error(function() {
					if (typeof onError === 'function') {
						onError.apply(null, [$this]);
					}
					next();
				});
				$this.attr('data-src', '');
				$this.addClass(classTransition).attr('src', s);
			}
		};

	PANDORA.IMAGESEQUENCE = {
		config: function(options) {
			var cfg = $.extend({
				classTransition: classTransition,
				classSelection: classSelection,
				duration: duration
			}, options);

			classSelection = cfg.classSelection;
			classTransition = cfg.classTransition;
			duration = cfg.duration;

			return this;
		},
		load: function() {
			onError = null;
			onSucess = null;
			$queue = $('img.' + classSelection);
			current = -1;
			next();
			return this;
		},
		success: function(callback) {
			onSucess = callback;
			return this;
		},
		error: function(callback) {
			onError = callback;
			return this;
		}
	};
})();

// PANDORA IMAGE WAITER
;
(function() {
	'use strict';
	var classSelection = 'wait',
		transitionFix = PANDORA.cssfix('transition'),

		show = function(node) {
			node.style.opacity = '';
			setTimeout(function() {
				node.style[transitionFix] = '';
			}, 500);
		},

		select = function(context) {
			var ctx = context || '';
			$(ctx + 'img.' + classSelection).each(function() {
				var $this = $(this).removeClass(classSelection),
					node = $this[0];

				node.style.opacity = '0';
				node.style[transitionFix] = 'opacity .4s';

				if (node.complete) {
					show(node);
				} else {
					$this.load(function() {
						show(this);
					});
				}


			});
		};

	PANDORA.IMAGEWAITER = {
		select: select
	};
})();

// PANDORA SOFTSCROLL

(function() {
	'use strict';
	var moving = false,
		noHash = false,
		anim = function(posY, vel, sel) {
			moving = true;
			PANDORA.$html.animate({
				'scrollTop': posY + 'px'
			}, vel, function() {
				moving = false;
				var hash = (!noHash) ? sel : '';
				window.location.hash = hash;

			});
		},
		moveTo = function(sel) {
			$(sel).eq(0).each(function() {
				var offY = parseInt($(this).offset().top);
				anim(offY, 1200, sel);
			});
		};

	PANDORA.SOFTSCROLL = {
		selectLinks: function(context) {
			var ctx = context || '';
			$(ctx + 'a').click(function(e) {
				var $this = $(this),
					url = $this.attr('href');
				if (url.indexOf('#') === 0) {
					e.preventDefault();
					noHash = ($this.hasClass('no-hash')) ? true : false;
					moveTo(url);
				}
			});
		},
		goByHash: function() {
			var hash = window.location.hash;
			PANDORA.$html.scrollTop(0);
			setTimeout(function() {
				if (hash !== '') {
					moveTo(hash);
				}
			}, 1000);
		}
	}
})();

// TABS

;
(function() {

	var tb = function(id) {
		return this.init(id);
	};


	tb.prototype = {
		init: function(id) {
			this.$tabs = $('#' + id).addClass('tabs');
			this.$container = this.$tabs.find('> .tab');
			this.$buttonContainer = $('<div class="tab-button-container"></div>').prependTo(this.$tabs);
			this.button = [];
			var self = this;

			this.$container.each(function(index) {
				var $this = $(this),
					name = $this.attr('data-tabname'),
					title = $this.attr('data-tabtitle'),
					cl = $this.attr('data-tabclass'),
					i = index;

				var newButton = $('<div class="tab-button ' + cl + '" title="' + title + '" data-index="' + i + '"><span class="icon-tab"></span>' + name + '</div>')
					.appendTo(self.$buttonContainer)
					.click(function() {
						var i = $(this).attr('data-index');
						self.change(i);
					});

				self.button.push(newButton);
			});
			this.change(0);
			$('.tab-button').bubble();
			return this;
		},
		change: function(index) {
			this.$container.removeClass('current').eq(index).addClass('current');
			var l = this.button.length;
			for (var i = 0; i < l; i++) {
				this.button[i].removeClass('current');
			}
			this.button[index].addClass('current');
			return this;
		}
	};

	PANDORA.TABS = function(id) {
		return new tb(id);
	};
})();

// PANDORA LOADER
;
(function() {
	'use strict';
	var duration = 400, // o show or hide blank
		blanked = true,
		initialized = false,
		hostUrl = window.location.host,
		currentUrl = window.location.href,
		pushSt = (typeof history !== 'undefined' && typeof history.pushState !== 'undefined'),
		blackDimmer = false,
		isIE = PANDORA.BROWSER.msie,

		getCleanUrl = function() {
			return window.location.protocol + '//' + window.location.hostname + window.location.pathname;
		},
		cleanUrl,

		// Stores
		$blank, $loader, $mainContent,

		showBlank = function() {
			$loader.removeClass('hidden').addClass('to70');
			if (blackDimmer) {
				$blank.addClass('black');
			} else {
				$blank.removeClass('black');
			}
			$blank.fadeIn(duration, function() {
				blanked = true;
			});
		},
		hideBlank = function() {
			$loader.removeClass('to70').addClass('to100').addClass('hidden');
			$blank.fadeOut(duration, function() {
				$loader.removeClass('to100');
				blanked = false;
			});
		},
		onSuccess = null,
		onBefore = null,
		load = function(url, back) {
			var isBack = back || false,
				timer = null,
				changed = false,
				hash = null,
				s = (url.indexOf('?') === -1) ? '?' : '&',
				defaultChange = function() {
					window.location.href = url;
				},
				change = function(data) {
					PANDORA.$scroll.scrollTop(0);
					$mainContent.html(data);
					var title = $('#hidden-title').text();
					if (title === '') {
						title = document.title;
					} else {
						document.title = title;
					}
					if (!isBack) {
						history.pushState({
							path: url
						}, title, url);
					}
					if (hash !== null) {
						url += '#' + hash;
					}
					currentUrl = url;
					hideBlank();

					cleanUrl = getCleanUrl();

					// On Complete
					if (typeof onSuccess === 'function') {
						onSuccess();
					}
				};
			if (url !== currentUrl) {
				if (url.indexOf('#') !== -1) {
					var arr = url.split('#');
					url = arr[0];
					hash = arr[1];
				}
				// On Before
				if (typeof onBefore === 'function') {
					onBefore();
				}
				showBlank();
				if (pushSt && url.indexOf(hostUrl) !== -1 && !isIE) {
					changed = false;
					$.ajax({
						url: url + s + 'async=1',
						success: function(data) {
							timer = setInterval(function() {
								if (blanked && !changed) {
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
			return this;
		};

	PANDORA.LOADER = {
		init: function() {
			if (!initialized) {
				cleanUrl = getCleanUrl();
				var initialUrl = window.location.href,
					hasChangeHash = (function() {
						var originalHash = window.location.hash;

						return function() {
							var newHash = window.location.hash,
								newCleanUrl = getCleanUrl();
							if (newHash !== originalHash && newCleanUrl === cleanUrl) {
								originalHash = newHash;
								cleanUrl = getCleanUrl();
								return true;
							} else {
								cleanUrl = getCleanUrl();
								return false;
							}
						};
					})();

				$blank = $('#blank-dimmer');
				$loader = $('#loader-line').addClass('to70');
				$mainContent = $('#content-main');
				setTimeout(function() {
					hideBlank();
				}, 400);
				initialized = true;
				if (pushSt && !isIE) {
					PANDORA.$window.bind('popstate', function(event) {
						var state = event.originalEvent.state;
						if (state) {
							PANDORA.LOADER.load(state.path, true);
						} else {
							var changedHash = hasChangeHash();
							if (!changedHash) {
								window.location.href = initialUrl;
							}
						}

					});
				}
			}
			return this;
		},
		setLinks: function(context) {
			var ctx = context || '';
			if (pushSt) {
				$(ctx + 'a:not(.no-async)').click(function(e) {
					var $this = $(this),
						url = $this.attr('href');
					if (url.indexOf(hostUrl) !== -1) {
						e.preventDefault();
						blackDimmer = ($this.attr('data-blank') === 'black') ? true : false;
						load(url);
					}
				});
			}
			return this;
		},
		load: load,
		before: function(callback) {
			onBefore = callback;
			return this;
		},
		success: function(callback) {
			onSuccess = callback;
			return this;
		}
	};
})();

// SHARE
;
(function() {
	'use strict';
	var shareLinks = {
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
		share = function($a) {
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
					}, shareLinks[on]),
					urlShare,
					windowWidth = PANDORA.$window.width(),
					heightWidth = PANDORA.$window.height(),
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
		},
		setLinks = function(context) {
			var ctx = context || '';
			$(ctx + 'a.share').click(function(e) {
				e.preventDefault();
				share($(this));
			});
		};

	PANDORA.SHARE = {
		setLinks: setLinks
	}
})();

// SOCIALCOMMENTS

(function() {

	var initialized = false,
		context = '',
		tabs = null,
		/*disqusComments = function(url) {
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
		},*/
		googleComments = {
			loadedApi: false,
			loadedComments: false,

			init: function() {
				var self = this;
				this.loadedComments = false;
				if (!this.loadedApi) {
					$.getScript('https://apis.google.com/js/plusone.js', function() {
						self.loadedApi = true;
						self.setTabEvent();
					});
				} else {
					self.setTabEvent();
				}
			},
			setTabEvent: function() {
				var self = this;
				tabs.button[1].click(function() {
					if (!self.loadedComments) {
						self.loadComments();
						self.loadedComments = true;
					}
				});
			},
			loadComments: function() {
				var idContainer = 'googleCommentsContainer',
					w = $('#' + idContainer).width();
				gapi.comments.render(idContainer, {
					href: window.location,
					width: w,
					first_party_property: 'BLOGGER',
					view_type: 'FILTERED_POSTMOD'
				});
			}
		};

	PANDORA.SOCIALCOMMENTS = {
		set: function(ctx) {
			context = ctx || '';

			tabs = PANDORA.TABS('commentTabs');


			setTimeout(function() {
				googleComments.init();
				//disqusComments();
			}, 400);



		}
	};

})();

// VALIDATION

(function() {

	'use strict';

	var $fieldsets = null,

		validateFieldset = function($fieldset) {

			$fieldset.removeClass('error');

			var isValid = true,
				$input = $fieldset.find('input,textarea'),
				minCharacters = parseInt($fieldset.attr('data-min')),
				val = $input.val(),
				showError = function() {
					$fieldset.addClass('error');
					$input.focus();
				};

			minCharacters = (isNaN(minCharacters)) ? 3 : minCharacters;

			if (val.length < minCharacters) {
				isValid = false;
				showError();
			} else {
				if ($fieldset.hasClass('email')) {
					if (val.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) == -1) {
						isValid = false;
						showError();
					}
				}
			}
			return isValid;
		},
		validate = function() {
			var valid = true;

			$fieldsets.each(function() {
				var v = validateFieldset($(this));
				if (!v) {
					valid = false;
				}
			});

			return valid;
		},
		set = function(context) {
			var ctx = context || '';

			$fieldsets = $(ctx + 'fieldset.validate').removeClass('validate');

			$('#submit').click(function(e) {
				if (!validate()) {
					e.preventDefault();
				}
			});
			$('#clearFields').click(function(e) {
				e.preventDefault();
				$fieldsets.removeClass('error').find('input,textarea').val('').eq(0).focus();
			});
		};

	PANDORA.VALIDATION = {
		set: set
	};
})();



PANDORA.open(function($) {
	'use strict';

	// Get page data
	var $pageData,
		pageMenu,
		pageId = 'home',
		isHome = false,
		context = '',
		headerVisible = true,
		$header = $('#header-main'),
		HEADER = {
			limitToHide: 0,
			sections: ['illustration', 'illustration-post', 'design', 'design-post', 'blog', 'blog-post', 'error404', 'search', 'about-me', 'page', 'contact'],
			backColors: {
				'illustration': false,
				'illustration-post': false,
				'design': true,
				'design-post': true,
				'blog': true,
				'search': true,
				'blog-post': true,
				'error404': true,
				'about-me': false,
				'page': true,
				'contact': false
			},
			setResposive: function() {
				var $dimm = $('#res-menu-dimmer');
				$('#res-menu-btn').click(function() {
					$header.add($dimm).addClass('res-show');
				});
				$dimm.add($header.find('a')).click(function() {
					$header.add($dimm).removeClass('res-show');
				});
				return this;
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
					i, l = this.sections.length;
				headerVisible = true;
				if (isHome) {
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
						if (isHome) {
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
		setBlurStyle = function(bl) {
			var blur = bl || 4,
				filter = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="invisible">';
			filter += '<filter id="blur"> <feGaussianBlur stdDeviation="' + blur + '" /> </filter>';
			filter += '</svg><style type="text/css">';
			filter += 'img.blur { filter: url(#blur); -webkit-filter: blur(' + blur + 'px); -moz-filter: blur(' + blur + 'px); filter: blur(' + blur + 'px); filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius="' + blur + '"); }';
			filter += '</style>';

			$('#content-main').append(filter);
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
		loadCSS = function(href) {
			var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
			$("head").append(cssLink);
		},
		setWipSlider = (function() {
			var loadedWip = false,
				set = function($wp) {
					$wp.wipSlider();
				};
			return function() {
				var $wipSlider = $('.wipSlider'),
					someWip = ($wipSlider.length > 0);

				if (someWip) {
					if (!loadedWip) {
						loadCSS(baseTemplateURL + '/js/libs/wipslider.css');
						$.getScript(baseTemplateURL + '/js/libs/jquery.wipSlider.min.js', function() {
							loadedWip = true;
							set($wipSlider);
						});
					} else {
						set($wipSlider);
					}
				}
			}
		})(),
		setPrettyPrint = (function() {
			var loadedPrettify = false;
			return function() {
				var somePre = false;
				$('pre').not('.no-print').each(function() {
					var $this = $(this).addClass('prettyprint');
					$this.text($this.html());
					somePre = true;
				});
				if (somePre) {
					if (!loadedPrettify) {
						loadCSS(baseTemplateURL + '/js/libs/prettify.css');
						$.getScript(baseTemplateURL + '/js/libs/prettify.js', function() {
							loadedPrettify = true;
							prettyPrint();
						});
						/*'//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert'*/
					} else {
						prettyPrint();
					}
				}
			};
		})(),
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
		ILLUSTRATIONPOST = function() {
			// Set Black Dimmer for navigatio arrows
			$('.blog-pagination-arrow a').attr('data-blank', 'black');
			PANDORA.SHARE.setLinks(context);
		},
		DESIGN = function() {
			// Set Menu to local
			setLocalMenu(['design'], true);
			gallery();
		},
		DESIGNPOST = function() {
			setBlurStyle();
			PANDORA.SHARE.setLinks(context);
			setPrettyPrint();
			setWipSlider();
		},
		BLOG = function() {
			// Set Menu to local
			setLocalMenu(['blog'], true);
		},
		BLOGPOST = function() {
			setBlurStyle();
			PANDORA.SHARE.setLinks(context);
			setPrettyPrint();
			PANDORA.VALIDATION.set(context);
			PANDORA.SOCIALCOMMENTS.set(context);
			setWipSlider();
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

			isHome = true;
			headerVisible = false;
			$header.addClass('hidden');
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

			context = (async) ? '#content-main ' : '';

			isHome = false;

			PANDORA.SOFTLIGHT.select(context);
			PANDORA.IMAGEWAITER.select(context);
			PANDORA.LOADER.setLinks(context);
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
				case 'illustration-post':
					ILLUSTRATIONPOST();
					break;
				case 'design':
					DESIGN();
					break;
				case 'design-post':
					DESIGNPOST();
					break;
				case 'blog':
					BLOG();
					break;
				case 'blog-post':
					BLOGPOST();
					break;
				case 'about-me':
					ABOUTME.init().resize().setEvent();
					break;
				default:
					//
			}
			HEADER.setResposive().setCurrentByScroll();
			PANDORA.SOFTSCROLL.selectLinks(context, 70);

			if (async && typeof ga === 'function') {
				var location = window.location.pathname + window.location.search;
				ga('send', 'pageview', {
					'page': location,
					'title': document.title
				});
			}
		};

	// FUNCTIONS UNIQUES: syncronic
	// header, footer
	PANDORA.SOFTSCROLL.goByHash();
	goTopBtn();
	PANDORA.LOADER.init().before(function() {
		// debe estar antes de LOAD
		PANDORA.ASYNC.clearEvents();
	}).success(function() {
		onComplete(true);
	});

	// FUNCTIONS BY PAGE: asyncronic
	onComplete(false);
});