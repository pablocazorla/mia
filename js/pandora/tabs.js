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

				var newButton = $('<div class="tab-button '+cl+'" title="' + title + '" data-index="' + i + '"><span class="icon-tab"></span>' + name + '</div>')
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