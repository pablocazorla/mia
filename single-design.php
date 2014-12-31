<?php get_header(); ?>
	<script type="text/javascript">pageID = 'design-post';</script>
	<style type="text/css">
		.header-blog img {
			filter: url('#blurfx');
			-webkit-filter: blur(3px);
			-moz-filter: blur(3px);
			-o-filter: blur(3px);
			-ms-filter: blur(3px);
			filter: blur(3px);	
			filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
		}
	</style>
	<svg xmlns="http://www.w3.org/2000/svg" height="0" style="position:absolute">
	   <filter height="116%" width="116%" y="-8%" x="-8%" id="blurfx">
	       <feGaussianBlur stdDeviation="3" in="SourceGraphic"/>
	   </filter>
	</svg>	
	<article class="blog-post design-post blog  page">
		<div class="col-blog-row">
			<div class="col-blog left">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<header class="header-blog">
					<?php if(has_post_thumbnail()){
					the_post_thumbnail('thumbnail');
					}else{ ?>
					<img src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />
					<?php } ?>
					<div class="header-box-container">
						<div class="header-container">
							<h1><?php the_title(); ?></h1>
							<div class="category alink-content">
								<a href="#comments-panel" class="link-to-comments">Comments</a>	
							</div>
							<?php the_excerpt();?>
						</div>
					</div>												
				</header>
				<section class="blog-container">					
					<div class="content">
						<?php the_content(); ?>
					</div>
					<hr/>
					<div class="comments-panel" id="comments-panel">					
						<div class="comments-panel-box">
							<?php comments_template(); ?>
						</div>
					</div>				
				</section>
				 <?php
				 	$titleShare = get_the_title();
				 	$descriptionShare = get_the_excerpt();
				 	$urlImageShare = url_thumbnail('full');
				 ?>
				<?php endwhile; endif; ?>
			</div>
		</div>
	</article>
	<nav class="post-navigation in-left">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>				
	</nav>
	<nav class="post-navigation">
		<a href="<?php echo get_post_type_archive_link('design'); ?>" class="back-to-grid"><span class="link-title">All Design</span></a>
		<?php previous_post_link('%link', '<span class="link-title"><b>Next:</b> %title </span>', FALSE); ?>
		<?php next_post_link('%link', '<span class="link-title"><b>Previous:</b> %title </span>', FALSE); ?>
	</nav>

<?php get_footer(); ?>