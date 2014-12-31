<?php
 /*Template Name: Illustration
 */
get_header(); ?>

	<?php
	 	$titleShare = 'Illustration';
	 	$descriptionShare = 'My portfolio is my best presentation. In my work as an illustrator and artist you are going to find a variety of styles: conceptual, fantastic, literary, realistic, functional design, video games, etc.';
	 	$urlImageShare = url_thumbnail('illustration-medium');
	 ?>

	<article class="illustration-list">
		<div class="wrap">
			<header class="header-article">
				<h1><?php echo $titleShare;?></h1>
				<p><?php echo $descriptionShare;?></p>
				<div class="gallery-menu">
					<?php
						echo '<span class="current">All</span>';
						$categories = get_categories(array('taxonomy' => 'illustration','hide_empty' => false));
						foreach ($categories as $category){
						echo '<span>' . $category->name . '</span>';
					} ?>
				</div>			
			</header>
			<section class="gallery row">
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
				<div class="col">
					<figure class="<?php echo $classType;?>">					
						<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" >
					        <?php if(has_post_thumbnail()){
								echo '<img class="illustration-thumb-img" rc="" src="' . url_thumbnail('illustration-thumb') .'">';
							} ?>
						</a>
						<figcaption><?php the_title(); ?></figcaption>			
					</figure>
				</div>
				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
				<?php else :?>
				<h2>Sorry, works not found</h2>
				<?php endif; ?>
			</section>
		</div>
	</article>	
<?php get_footer(); ?>