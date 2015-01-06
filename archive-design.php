<?php
 /*Template Name: Design
 */
get_header(); ?>
	<article class="article-main">
		<div class="design-container">
			<header class="header-article header-article-design-list">
				<div class="header-main-back"></div>
				<div class="wrap header-article-content">
					<h1>Design</h1>
					<div class="red-line"></div>
					<p class="cite">Just beautiful things.</p>
					<div class="gallery-menu" id="gallery-menu">
						<?php
							echo '<span class="gm-btn current">All</span>';
							$categories = get_categories(array('taxonomy' => 'design','hide_empty' => false));
							foreach ($categories as $category){
							echo '<span class="gm-btn">' . $category->name . '</span>';
						} ?>
					</div>	
				</div>
			</header>
			<section class="gallery gallery-design clearfix">
			<?php
				$list = new WP_Query('post_type=design&posts_per_page=64');
				if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>			
				<?php
					$types = get_the_terms( $post->ID, 'design' );
					$classType = '';										
					if ( $types && ! is_wp_error( $types ) ) {
						foreach ( $types as $type ) {
							$classType = $classType." ".str_replace(" ","-",strtolower($type->name));
						}
					}
				?>
				<figure class="<?php echo $classType;?>">
			        <?php if(has_post_thumbnail()){
					echo '<img class="design-thumb-img" rc="" src="' . url_thumbnail('design-thumb') .'">';
					} ?>
					<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" >
						<figcaption>
							<h2><?php the_title(); ?></h2>
						</figcaption>
					</a>							
				</figure>			
				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
				<?php else :?>
				<h2>Sorry, works not found</h2>
				<?php endif; ?>
			</section>
		</div>	
	</article>	
<?php get_footer(); ?>