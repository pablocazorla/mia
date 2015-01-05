<?php get_header(); ?>
	<article class="article-main">
<?php
desaturateImageStyle();
if (have_posts()) : while (have_posts()) : the_post(); 
$titleShare = get_the_title();
$descriptionShare = get_the_excerpt();
$urlImageShare = url_thumbnail('large');
$blogLink = pc_category_link('Blog');
?>
		<header class="header-article header-article-blog-post">		
			<img class="header-article-img desaturate" src="<?php if(has_post_thumbnail()){ echo url_thumbnail('large');} ?>"/>
			<div class="wrap header-article-content">
				<h1><?php echo $titleShare;?></h1>
				<div class="red-line"></div>			
				<p class="subtitle">
						<?php the_category(', '); ?>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#comments"><?php comments_number('Comments', '1 comment', '% comments');?></a>
				</p>
				<nav class="share-nav">	
					<a href="" class="share link-facebook" data-share="{'on':'facebook'}"></a><a href="" class="share link-google" data-share="{'on':'google'}"></a><a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"></a><a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"></a>
				</nav>
			</div>
		</header>
		<section class="wrap-min the-content blog-post-content">			
			<?php the_content(); ?>
			<hr class="hr-grey"/>
		</section>
		<section class="wrap-min comments-section blog-post-comments">
			<?php comments_template(); ?>
		</section>

		<?php endwhile; else :?>
		<div class="wrap-min">
			<h2>Sorry, post not found</h2>
		</div>		
		<?php endif; ?>
		<nav class="blog-pagination">
			<div class="wrap clearfix">
				<div class="blog-pagination-arrow to-left">
					<?php previous_post_link('&lt; %link'); ?>
				</div>
				<div class="blog-pagination-arrow to-right">				
					<?php next_post_link('%link &gt;');	?>
				</div>
			</div>
		</nav>
	</article>
<?php get_footer(); ?>