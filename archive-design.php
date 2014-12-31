<?php
 /*Template Name: Illustration
 */
get_header(); ?>
	<script type="text/javascript">pageID = 'design-list';</script>
	<?php
	 	$titleShare = 'Design';
	 	$descriptionShare = 'Elegant design, useful interfaces, beautiful things...';
	 	$urlImageShare = url_thumbnail('design-thumb');
	 ?>
	<article class="design-list  page">
		
		<section id="design-slider" style="display:none">
			<?php
			$toLeft = 1;
			$list = new WP_Query('post_type=design&posts_per_page=6');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>
			<?php $toLeft = $toLeft * -1; ?>
			<div class="d-slide <?php echo ($toLeft > 0 ? 'to-left' : ''); ?>">
				<div class="d-slide-container">
					<div class="d-slide-text">
						<h2><?php the_title(); ?></h2>
						<?php the_excerpt(); ?>

						<?php $terms = get_the_terms($post->ID, 'design' );
						if ($terms && ! is_wp_error($terms)) :
							$term_slugs_arr = array();
							foreach ($terms as $term) {
							    $term_slugs_arr[] = $term->slug;
							}
							$terms_slug_str = $term_slugs_arr[0];
						endif;
						?>
					</div>
					<div class="d-slide-anim">
						<a href="<?php the_permalink(); ?>" class="d-slide-anim-ramp alink">
							<?php if($terms_slug_str == 'webdesign'){ ?>
							<div class="d-slide-anim-img-web">
								<?php
								if(has_post_thumbnail()){
						           	the_post_thumbnail('design-thumb');
						        }
						        ?>
						        <span class="d-slide-link-shine"></span>
							</div>
							<img class="d-slide-anim-fg-web" src="<?php bloginfo('template_url'); ?>/img/design/pc.png"/>
							<?php }else if($terms_slug_str == 'infographics'|| $terms_slug_str == 'lab'){ ?>
								<div class="d-slide-anim-img-infogr">
									<span class="win-btn r"></span><span class="win-btn y"></span><span class="win-btn g"></span>
									<div class="d-slide-anim-img-infogr-cont">
										<?php
										if(has_post_thumbnail()){
						           	the_post_thumbnail('design-thumb');
						        }
						        ?>
						        <span class="d-slide-link-shine"></span>
									</div>
								</div>
							<?php }else{ ?>
								<div class="d-slide-anim-img-other">
									<?php
									if(has_post_thumbnail()){
					           	the_post_thumbnail('design-thumb');
					        }
					        ?>
					        <span class="d-slide-link-shine"></span>
								</div>
					     <?php } ?>
						</a>
					</div>
				</div>
			</div>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
			<?php else :?>
			<div class="d-slide">Sorry, works not found</div>
			<?php endif; ?>
		</section>
		<div id="design-more" style="display:none">
			<section class="gallery clearfix">
			<?php
			$list = new WP_Query('post_type=design&posts_per_page=58&offset=6');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>		
			
			<figure>						
				<a href="<?php the_permalink(); ?>" class="alink">	
					<?php if(has_post_thumbnail()){
						echo '<img style="opacity:1" src="' . url_thumbnail('illustration-thumb') .'">';
					} ?>				
				</a>
				<figcaption class="gallery-caption for-design"><?php the_title(); ?></figcaption>				
			</figure>	   
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
			<?php else :?>
			<h2>Sorry, works not found</h2>
			<?php endif; ?>
		</section>
		</div>		
	</article>
<div id="scroll-down">
	<div id="scroll-down-inner">
		Scroll down
		<span class="scroll-icon"></span>
	</div>	
</div>
<div id="design-loading">Loading beautifull things...</div>
<style>
#footer-main{display: none;}
</style>
<nav class="post-navigation in-left">
	<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
	<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
	<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
	<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>
</nav>
<?php get_footer(); ?>
