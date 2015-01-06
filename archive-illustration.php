<?php
 /*Template Name: Illustration
 */
get_header(); ?>

	<article class="article-main">
		<header class="header-article header-article-illustration-list">
			<div class="wrap header-article-content">
				<h1>Illustration</h1>
				<div class="red-line"></div>
				<p class="cite">My portfolio is my best presentation. In my work as an illustrator and artist you are going to find a variety of styles: conceptual, fantastic, literary, realistic, functional design, video games, etc.</p>
				<div class="gallery-menu" id="gallery-menu">
					<?php
						echo '<span class="gm-btn current">All</span>';
						$categories = get_categories(array('taxonomy' => 'illustration','hide_empty' => false));
						foreach ($categories as $category){
						echo '<span class="gm-btn">' . $category->name . '</span>';
					} ?>
				</div>	
			</div>
		</header>
		<section class="gallery clearfix">
		<?php
			$list = new WP_Query('post_type=illustration&posts_per_page=64');
			if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>			
			<?php
				$types = get_the_terms( $post->ID, 'illustration' );
				$classType = '';										
				if ( $types && ! is_wp_error( $types ) ) {
					foreach ( $types as $type ) {
						$classType = $classType." ".str_replace(" ","-",strtolower($type->name));
					}
				}
			?>
			<figure class="<?php echo $classType;?>">
		        <?php if(has_post_thumbnail()){
				echo '<img class="illustration-thumb-img" rc="" src="' . url_thumbnail('illustration-thumb') .'">';
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
	</article>	
<?php get_footer(); ?>