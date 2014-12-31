<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<nav class="post-navigation in-left">
	<?php
	 	$titleShare = get_the_title();
	 	$descriptionShare = get_the_excerpt();
	 	$urlImageShare = url_thumbnail('illustration-medium');
	?>
	<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
	<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
	<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
	<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>
</nav>
<nav class="post-navigation">
	<?php				 
		echo '<a href="'.get_post_type_archive_link('illustration').'" class="back-to-grid"><span class="link-title">All Illustrations</span></a>';

		$prev_post = get_previous_post();
		$srcImgBigPrev = wp_get_attachment_image_src( get_post_thumbnail_id($prev_post->ID), 'large');	
		if (!empty( $prev_post )){
			echo '<a href="'.get_permalink( $prev_post->ID ).'" class="next-post"><span class="link-title">'.get_the_title($prev_post->ID).'</span></a>';
		}

		$next_post = get_next_post();
		$srcImgBigNext = wp_get_attachment_image_src( get_post_thumbnail_id($next_post->ID), 'large');
		if (!empty( $next_post )){
			echo '<a href="'.get_permalink( $next_post->ID ).'" class="prev-post"><span class="link-title">'.get_the_title($next_post->ID).'</span></a>';
		}
	?>	
</nav>
<script type="text/javascript">pageID = 'illustration-post';</script>
<article class="illustration-post-large-image">
	<figure>				
		<img src="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>"/>
	</figure>
</article>
<article class="illustration-post  page" id="illustration-<?php the_ID();?>">	
	<section class="summary">
		<div class="summary-content clearfix <?php if (!$async){ echo 'visible ';} customVal('summaryColor');?>">
			<div class="summary-content-col <?php customVal('summaryPosition');echo ' '; customVal('summaryBackground');?>">
				<h1><?php the_title(); ?></h1>
				
				<div class="summary-excerpt">
					<?php the_excerpt(); ?>
				</div>
			</div>
		</div>
	</section>
	<?php if(strlen(get_the_content()) >= 5){ ?>
	<section class="panel illustration-content">
		<div class="text-box content">
			<?php the_content(); ?>
		</div>
	</section>
	<?php } ?>
	<section class="comments-panel" id="comments-panel">
		<div class="comments-panel-box">
			<?php comments_template(); ?>
		</div>
	</section>
</article>
<?php endwhile; endif; ?>
<div id="scroll-down">
	<div id="scroll-down-inner">
		Scroll down
		<span class="scroll-icon"></span>
	</div>	
</div>
<?php get_footer(); ?>