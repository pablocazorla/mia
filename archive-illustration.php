<?php
 /*Template Name: Illustration
 */
get_header(); ?>
	<article class="article-main">

		<div class="invisible" id="page-data" data-menu="illustration" data-page="archive-illustration"></div>

		<header class="header-article header-article-illustration-list">
			<div class="wrap header-article-content">
				<h1 class="soft-light slg-bottom">Illustration</h1>
				<div class="red-line soft-light slg-bottom"></div>
				<p class="cite soft-light slg-bottom">My portfolio is my best presentation. In my work as an illustrator and artist you are going to find a variety of styles: conceptual, fantastic, literary, realistic, functional design, video games, etc.</p>
				<div class="gallery-menu soft-light slg-bottom" id="gallery-menu">
					<?php
						echo '<span class="gm-btn current">All</span>';
						$categories = get_categories(array('taxonomy' => 'illustration','hide_empty' => false));
						foreach ($categories as $category){
						echo '<span class="gm-btn">' . $category->name . '</span>';
					} ?>
				</div>	
			</div>
		</header>
		<section id="gallery" class="gallery clearfix">
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
			<figure class="gallery-fig <?php echo $classType;?> soft-light slg-bottom">
		        <?php if(has_post_thumbnail()){
				echo '<img class="illustration-thumb-img srcwait" src="" srcwait="' . url_thumbnail('illustration-thumb') .'">';
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