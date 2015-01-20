/* JQuery wipSlider Plugin
 * @author: Pablo Cazorla
 * @e-mail: pablo.cazorla@huddle.com.ar
 * @date: 10/09/2013
 */
(function($){
  $.fn.wipSlider = function(options){		
		return this.each(function(){			
			var $this = $(this),
				data = $this.attr('data') || '';				
				try{data = jQuery.parseJSON('{"'+data.split('=').join('":').split('&').join(',"')+'}');}catch(e){data = {};}				
			var set = $.extend({
		      		duration:2500,
		      		transition:500,
		      		initial : 0,
		      		autoplay:true
				}, data),
				$slides = $this.find('>div'),				
				current = set.initial,
				length = $slides.length,
				moving = false,
				player = null,
				playing = false,
				imgWidth = '100%',
				startWip = function(){
					imgWidth = $this.find('img').eq(0).width();
					$this.css('max-width',imgWidth).addClass('wipSliderActive').append('<div class="wipCtrl"><div class="wipBtn"><span></span><span></span></div><div class="wipRage"><span></span></div></div>');
						
					var $btn = $this.find('.wipBtn'),
						$range = $this.find('.wipRage'),
						$rangeValue = $range.find('span'),
						rangeStep = 100/length,
						changeSlide = function(num){
							if(!moving && num != current){
								moving = true;	
								$slides.css('z-index','10').eq(current).css('z-index','11');
								
								$slides.eq(num).css({'z-index':'12','opacity':'0'}).animate({'opacity':'1'},set.transition,function(){
									moving = false;
									current = num;
								});
								$rangeValue.css('width',rangeStep * (num +1)+'%');
							}					
						},
						play = function(){
							player = setInterval(function(){
								var next = current +1;
								if(next >= length){next=0;}
								changeSlide(next);
							},set.duration);
							$btn.addClass('play');
							playing = true;
						},
						pause = function(){
							if(player != null){clearInterval(player);}
							$btn.removeClass('play');
							playing = false;
						}
						
					// START
					$rangeValue.css('width',rangeStep * (current +1)+'%');				
					if (set.autoplay) {play();}
					
					// EVENTS
					$btn.click(function(){ 
						if (playing){pause();}else{play();}
					});			
					$range.click(function(ev){					
						var num = Math.round((ev.pageX - $range.offset().left) * (length-1) / $range.width());
						if(num != current){
							changeSlide(num);
							if (playing){pause();play();}
						}								
					});
				}
			/**********************************************/
			var tmpImg = new Image();
			tmpImg.src = $this.find('img').eq(0).attr('src');				
			tmpImg.onload = function() {
			    startWip();			    
			};
		});
	};
})(jQuery);