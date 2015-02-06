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