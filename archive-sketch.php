<?php
 /*Template Name: Sketch
 */
get_header(); ?>

	<?php
	 	$titleShare = 'Sketchbook';
	 	$descriptionShare = 'Some ideas, some drawings. Many of them fail to materialize into a final work, others do. But they are almost always the first and essential step in my workflow.';
	 	$urlImageShare = url_thumbnail('sketchbook-image');
	 ?>

	<article class="article-main">
		<div class="sketchbook-container">	
			<header class="header-article wrap">
				<h1><?php echo $titleShare;?></h1>
				<p><?php echo $descriptionShare;?></p>					
			</header>
			<section class="wrap sketchbook">			
					<div class="row">
					<?php $list = new WP_Query('post_type=sketch&posts_per_page=60');
					if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>

						<div class="col col-6 sk-page">	
							<img src="<?php bloginfo('template_url'); ?>/img/sketchbook/shadow-top.png">			
							<div class="sk-page-front">
								<?php if(has_post_thumbnail()){
									echo '<img class="sketchbook-img" srcw="" src="' . url_thumbnail('sketchbook-image') .'">';
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
						<div class="col col-12">
							<h2>Sorry, sketches not found!</h2>
						</div>
					<?php endif; ?>
					</div>				
			</section>
		</div>
	</article>	
<?php get_footer(); ?>