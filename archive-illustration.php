<?php 
 /*Template Name: Illustration
 */
$async = $_GET['async'];
if (!$async){
	get_header();
} ?>
<article class="article-main">
	<?php if ($async){?>
		<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
	<?php } ?>
	<div class="invisible" id="page-data" data-page="illustration"></div>
	<section id="illustration">
		<header class="wrap header-section">
			<h1 class="softlight">Illustration</h1>
			<div class="red-line softlight"></div>
			<p class="softlight">Conceptual, fantastic, literary, realistic, functional, games...</p>
			<div class="gallery-menu soft-light slg-bottom" id="gallery-menu">
				<?php
					echo '<span class="gm-btn current">All</span>';
					$categories = get_categories(array('taxonomy' => 'illustration','hide_empty' => false));
					foreach ($categories as $category){
					echo '<span class="gm-btn">' . $category->name . '</span>';
				} ?>
			</div>	
			











			
		</header>
		<div id="illustration-gallery" class="clearfix">
<?php $list = new WP_Query('post_type=illustration&posts_per_page=60');
if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>

			<figure class="illustration-figure softlight selected">
		        <?php if(has_post_thumbnail()){
					echo '<img class="auto img-sequence" src="" data-src="' . url_thumbnail('illustration-thumb') .'">';
				} ?>
				<a href="<?php the_permalink(); ?>">
					<figcaption>						
						<h2><?php the_title(); ?></h2>
						<p>Concept art</p>
					</figcaption>
				</a>							
			</figure>

<?php endwhile; 
wp_reset_postdata(); 
endif;
?>
		</div>				
	</section>
</article>
<?php
if (!$async){
	get_footer();
} ?>