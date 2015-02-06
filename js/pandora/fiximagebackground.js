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

			if(this.cfg.$image !== null && this.cfg.$container !== null){
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

				if(typeof callback === 'function'){
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