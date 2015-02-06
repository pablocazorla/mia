// SOCIALCOMMENTS

(function() {

	var initialized = false,
		context = '',
		tabs = null,
		disqusComments = function(url) {
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
		},
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