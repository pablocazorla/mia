<?php
/*
Template Name: About me
*/
$async = $_GET['async'];
if (!$async){
	get_header();
} ?>
	<article class="article-main">
		<?php if ($async){?>
			<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
		<?php } ?>
		<div class="invisible" id="page-data" data-menu="about" data-page="about"></div>
		<?php
		if (have_posts()) : while (have_posts()) : the_post();
		?>
		
		<section class="about-presentation">
			<img id="about-img" src="<?php bloginfo('template_url'); ?>/img/about.jpg"/>
			<div id="about-text" class="soft-light slg-bottom">
				<div class="wrap">
					<div class="about-col">
						<p>I'm digital artist, illustrator, and webdesigner.</p>
						<p>I love fantasy illustration, concept art, movies, web apps,  3D animation and everything about the world of the image.</p>
						<p>I live and work as a professional freelance in Mendoza, Argentina.</p>
					</div>
					
				</div>
			</div>
		</section>
		<section class="wrap-min the-content page-content">			
			<?php the_content(); ?>
		</section>
		<section class="map-contact">
			<div id="map-goo"></div>
		</section>
		<?php endwhile; else :?>
		<div class="wrap-min">
			<h2>Sorry, post not found</h2>
		</div>		
		<?php endif; ?>
	</article>	
<?php
if (!$async){
	get_footer();
} ?>