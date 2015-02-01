// PANDORA IMAGE QUEUE
(function() {

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

	}



})();