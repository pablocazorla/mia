<?php
/*
Template Name: About me
*/
$async = $_GET['async'];
if (!$async){
	get_header();
} ?>
	<article class="article-main article-page article-about">
		<?php if ($async){?>
			<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
		<?php } ?>
		<div class="invisible" id="page-data" data-menu="about" data-page="about"></div>
		<?php
		if (have_posts()) : while (have_posts()) : the_post();
		?>
		
		<section class="about-presentation">
			<img id="about-img" class="wait-complete" src="<?php bloginfo('template_url'); ?>/img/about.jpg"/>
			<div id="about-text" class="soft-light slg-bottom">
				<div class="wrap">
					<div class="about-col">
						<?php the_content(); ?>
					</div>					
				</div>
			</div>
		</section>
		<?php endwhile; endif;?>
	</article>	
<?php
if (!$async){
	get_footer();
} ?>