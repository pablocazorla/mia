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
		<div class="invisible" id="page-data" data-menu="design" data-page="archive-design"></div>

		<header class="header-article header-article-design-list">
			<div class="header-main-back"></div>
			<div class="wrap header-article-content">
				<h1 class="soft-light slg-bottom">Design</h1>
				<div class="red-line soft-light slg-bottom"></div>
				<p class="cite soft-light slg-bottom">Just beautiful things.</p>
				<div class="gallery-menu soft-light slg-bottom" id="gallery-menu">
					<?php
						echo '<span class="gm-btn current">All</span>';
						$categories = get_categories(array('taxonomy' => 'design','hide_empty' => false));
						foreach ($categories as $category){
						echo '<span class="gm-btn">' . $category->name . '</span>';
					} ?>
				</div>	
			</div>
		</header>
		<section id="gallery" class="clearfix wrap gallery-design">
		<?php
			$alt = -1;
			$list = new WP_Query('post_type=design&posts_per_page=64');
			if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>			
			<?php
				$alt *= -1;
				$types = get_the_terms( $post->ID, 'design' );
				$classType = '';										
				if ( $types && ! is_wp_error( $types ) ) {
					foreach ( $types as $type ) {
						$classType = $classType." ".str_replace(" ","-",strtolower($type->name));
					}
				}
			?>
			<div class="gallery-fig clearfix design-pod <?php echo $classType; if($alt < 0){ echo ' alt';}?> soft-light slg-bottom">
				<div class="design-box design-image">
					<?php if($classType == ' webdesign'){ ?>
					<img class="design-pc" src="<?php bloginfo('template_url'); ?>/img/design-pc.png"/>
					<?php }?>
					<figure class="<?php if($classType == ' webdesign'){echo 'wd-figure';}?>">
				        <?php if(has_post_thumbnail()){
						echo '<img class="design-thumb-img srcwait" src="" srcwait="' . url_thumbnail('design-thumb') .'">';
						} ?>
						<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" >
							<figcaption><span>More</span></figcaption>
						</a>							
					</figure>										
				</div>
				<div class="design-box design-gap"></div>
				<div class="design-box design-text">
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p class="design-category"><?php echo $classType;?></p>
					<p><?php the_excerpt();?></p>
				</div>
			</div>

			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
			<?php else :?>
			<h2>Sorry, works not found</h2>
			<?php endif; ?>
		</section>
	</article>	
<?php
if (!$async){
	get_footer();
} ?>