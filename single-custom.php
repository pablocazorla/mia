<?php get_header(); ?>
	<article id="main-article" class="wrap single single-custom">
		<section class="post">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<header class="post-header">
				<h1><?php the_title(); ?></h1>
				<div class="category">
					<?php the_category(', '); ?> <span class="category-separator">|</span> <a href="#comments-panel">Comments</a>	
				</div>
				<?php the_excerpt();?>
			</header>
			<div class="content">
				<?php the_content(); ?>
			</div>
			<div class="comments-panel">
				<?php comments_template(); ?>
			</div>		
			<?php endwhile; ?>
			<?php else :?>
			<h2>Sorry, post not found</h2>
			<?php endif; ?>
		</section>
		<aside class="aside-sidebar">
			<?php get_sidebar(); ?>
		</aside>	
	</article>
<?php get_footer(); ?>