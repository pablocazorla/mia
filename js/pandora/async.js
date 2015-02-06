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
			if(!initialized){
				init();
			}
			onWindowScroll['asyncFunction' + counter] = callback;
			++counter;
			return this;
		},
		resize: function(callback) {
			if(!initialized){
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