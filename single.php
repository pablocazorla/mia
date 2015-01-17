<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>
	<article class="article-main" data-id="<?php the_ID();?>">
		<?php if ($async){?>
			<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
		<?php } ?>
		<div class="invisible" id="page-data" data-menu="" data-page="single"></div>
<?php
desaturateImageStyle();
if (have_posts()) : while (have_posts()) : the_post(); 
$titleShare = get_the_title();
$descriptionShare = get_the_excerpt();
$urlImageShare = url_thumbnail('large');
$blogLink = pc_category_link('Blog');
?>
		<header class="header-article header-article-blog-post in-single">		
			<img class="header-article-img desaturate wait-complete" src="<?php if(has_post_thumbnail()){ echo url_thumbnail('large');} ?>"/>
			<div class="wrap header-article-content">
				<h1 class="soft-light slg-bottom"><?php echo $titleShare;?></h1>
				<div class="red-line soft-light slg-bottom"></div>			
				<p class="subtitle soft-light slg-bottom">
						<?php the_category(', '); ?>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#comments"><?php comments_number('Comments', '1 comment', '% comments');?></a>
				</p>
				<nav class="share-nav soft-light slg-bottom">	
					<a href="" class="share link-facebook" data-share="{'on':'facebook'}"></a><a href="" class="share link-google" data-share="{'on':'google'}"></a><a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"></a><a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"></a>
				</nav>
			</div>
		</header>
		<div class="wrap clearfix blog-row">
			<div class="blog-col col-right">
				<?php get_sidebar(); ?>
			</div>
			<div class="blog-col col-left">
				<section class="the-content blog-post-content">			
					<?php the_content(); ?>
					<hr class="hr-grey"/>
				</section>
				<section class="comments-section blog-post-comments">

				<div id="disqus_thread"></div>
				<script type="text/javascript">
					
				</script>




















					<?php //comments_template(); ?>
				</section>
			</div>			
		</div>	

		<?php endwhile; else :?>
		<div class="wrap-min soft-light slg-bottom">
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
<?php
if (!$async){
	get_footer();
} ?>