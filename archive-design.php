<?php
/* Template Name: Design
 */
$async = $_GET['async'];
if (!$async){
	get_header();
} ?>
<article class="article-main">
	<?php if ($async){?>
		<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
	<?php } ?>
	<div class="invisible" id="page-data" data-menu="" data-page="design"></div>
	<section id="design">
		<header class="wrap header-section">
			<h1 class="softlight">Design</h1>
			<div class="red-line softlight"></div>
			<p class="softlight">Conceptual, fantastic, literary, realistic, functional, games...</p>
			<div class="gallery-menu soft-light slg-bottom" id="gallery-menu">
				<?php
					echo '<span class="gm-btn current">All</span>';
					$categories = get_categories(array('taxonomy' => 'design','hide_empty' => false));
					foreach ($categories as $category){
					echo '<span class="gm-btn">' . $category->name . '</span>';
				} ?>
			</div>
		</header>
		<div id="design-gallery">
<?php
$alt = -1;
$backCol = 1;
$list = new WP_Query('post_type=design&posts_per_page=24');
if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); 			
$alt *= -1;
$backCol += 1;
if($backCol > 8){
	$backCol = 1;
}
$types = get_the_terms( $post->ID, 'design' );
$className = '';
$classType = '';									
if ( $types && ! is_wp_error( $types ) ) {
	foreach ( $types as $type ) {
		$className = $type->name;
		$classType = $classType." ".str_replace(" ","-",strtolower($type->name));
	}
}
?>

			<div class="gallery-fig softlight <?php echo ' backcolor'.$backCol; echo $classType; if($alt < 0){ echo ' alt';}?>" data-softlight="rotateY:90,from:-20">
				<div class="wrap clearfix design-pod">
					<div class="design-box design-image">
						<?php if($classType == ' webdesign'){ ?>
						<img class="design-pc" src="<?php bloginfo('template_url'); ?>/img/design-pc.png"/>
						<?php }?>
						<figure class="<?php if($classType == ' webdesign'){echo 'wd-figure';}?>">
					        <?php if(has_post_thumbnail()){
							echo '<img class="design-thumb-img img-sequence" src="" data-src="' . url_thumbnail('design-thumb') .'">';
							} ?>
							<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" >
								<figcaption><span>More</span></figcaption>
							</a>							
						</figure>										
					</div>
					<div class="design-box design-gap"></div>
					<div class="design-box design-text">
						<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<p class="design-category"><?php echo $className;?></p>
						<?php the_excerpt();?>
					</div>
				</div>
			</div>

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