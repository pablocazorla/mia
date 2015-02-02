<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>
	<article class="article-main article-blog article-post" data-id="<?php the_ID();?>">
		<?php if ($async){?>
			<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
		<?php } ?>
		<div class="invisible" id="page-data" data-page="blog-post"></div>
<?php
if (have_posts()) : while (have_posts()) : the_post(); 
$titleShare = get_the_title();
$descriptionShare = get_the_excerpt();
$urlImageShare = url_thumbnail('large');
$blogLink = pc_category_link('Blog');
?>
		<section id="blog-post" class="blog-post">
			<header class="header-section dark">
			
<img class="header-section-background auto blur wait" src="<?php if(has_post_thumbnail()){ echo url_thumbnail('large');} ?>"/>

				<div class="wrap">
					<h1 class="softlight">
						<?php echo $titleShare;?>
					</h1>
					<div class="red-line softlight"></div>
					<p class="softlight">
						<?php the_category(', '); ?>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#comments">Comments</a>				
					</p>
					<nav class="share-nav softlight">	
						<a href="" class="share link-facebook bubble" title="Share on Facebook" data-share="{'on':'facebook'}"></a><a href="" class="share link-google bubble" title="Share on Google+" data-share="{'on':'google'}"></a><a href="" class="share link-twitter bubble" title="Share on Twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"></a><a href="" class="share link-pinterest bubble" title="Share on Pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"></a>
					</nav>
				</div>
			</header>
			<div class="wrap clearfix blog-content">
				<div class="blog-col col-right">
					<?php get_sidebar(); ?>
				</div>
				<div class="blog-col col-left">
					<div class="the-content">			
						<?php the_content(); ?>
						
					</div>
					<div class="blog-post-comments" id="comments">
						<hr class="hr-grey"/>
						<?php comments_template(); ?>
					</div>
				</div>
			</div>
<?php endwhile; endif; ?>			
		</section>
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
<?php
if (!$async){
	get_footer();
} ?>