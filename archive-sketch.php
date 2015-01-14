<?php
 /*Template Name: Sketch
 */
get_header(); ?>
	<article class="article-main">

		<div class="invisible" id="page-data" data-menu="sketches" data-page="archive-sketch"></div>

		<div class="sketchbook-container">
			<header class="header-article header-article-sketch-list">
				<div class="header-main-back"></div>
				<div class="wrap header-article-content">
					<h1 class="soft-light slg-bottom">Sketchbook</h1>
					<div class="red-line soft-light slg-bottom"></div>
					<p class="cite soft-light slg-bottom">Some ideas, some drawings. Many of them fail to materialize into a final work, others do. But they are almost always the first and essential step in my workflow.</p>
				</div>
			</header>
			<section class="wrap sketchbook">			
					<div class="row">
					<?php $list = new WP_Query('post_type=sketch&posts_per_page=60');
					if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>

						<div class="col col-6 sk-page soft-light slg-bottom">	
							<img src="<?php bloginfo('template_url'); ?>/img/sketchbook/shadow-top.png">			
							<div class="sk-page-front">
								<?php if(has_post_thumbnail()){
									echo '<img class="sketchbook-img srcwait" src="" srcwait="' . url_thumbnail('sketchbook-image') .'">';
								} ?>
								<div class="sk-page-text">
									<?php the_content(); ?>
								</div>
							</div>
							<img src="<?php bloginfo('template_url'); ?>/img/sketchbook/shadow-bottom.png">
						</div>
					<?php endwhile; 
					wp_reset_postdata(); 
					else :?>
						<div class="col col-12 soft-light slg-bottom">
							<h2>Sorry, sketches not found!</h2>
						</div>
					<?php endif; ?>
					</div>				
			</section>
		</div>
	</article>	
<?php get_footer(); ?>