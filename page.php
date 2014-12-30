<?php get_header(); ?>
	<article id="main-article" class="wrap single page">
		<section class="post">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<header class="post-header">
				<h1><?php the_title(); ?></h1>
			</header>
			<div class="content">
				<?php the_content(); ?>
			</div>		
			<?php endwhile; ?>
			<?php else :?>
			<h2>Sorry, page not found</h2>
			<?php endif; ?>
		</section>
		<aside class="aside-sidebar">
			<?php get_sidebar(); ?>
		</aside>	
	</article>
<?php get_footer(); ?>