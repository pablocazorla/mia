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
		BROWSER.msie = /msie/.test(ua);
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
		BROWSER:BROWSER,
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