// SOCIALCOMMENTS
;
(function() {

	var initialized = false,
		context = '',
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
		googleComments = function(){
			var idContainer = 'googleCommentsContainer',
				w = $('#'+idContainer).width();
			gapi.comments.render(idContainer, {
			    href: window.location,
			    width: w,
			    first_party_property: 'BLOGGER',
			    view_type: 'FILTERED_POSTMOD'
			});
		};

	PANDORA.SOCIALCOMMENTS = {
		set: function(ctx) {
			context = ctx || '';

			setTimeout(function() {
				if (!initialized) {
					$.getScript('https://apis.google.com/js/plusone.js', googleComments);
				}else{
					googleComments();
				}
				//disqusComments();
			}, 400);



		}
	};

})();