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