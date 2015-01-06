<?php get_header(); ?>
<article class="article-main">

<?php 
desaturateImageStyle();
if (have_posts()) : while (have_posts()) : the_post();
$titleShare = get_the_title();
$descriptionShare = get_the_excerpt();
$urlImageShare = url_thumbnail('illustration-large');
$illustrationLink = get_post_type_archive_link('illustration');
?>

	<header class="header-article header-article-illustration-post">		
		<img class="header-article-img desaturate" src="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>"/>
		<div class="wrap header-article-content">
			<h1><?php echo $titleShare;?></h1>
			<div class="red-line"></div>
			<p class="subtitle"><a href="<?php echo $illustrationLink; ?>">Illustration</a></p>	
		</div>
	</header>
	<figure class="wrap illustration-large">
		<figcaption>
			<p class="cite"><?php echo $descriptionShare;?></p>			
			<nav class="share-nav">	
				<a href="" class="share link-facebook" data-share="{'on':'facebook'}"></a><a href="" class="share link-google" data-share="{'on':'google'}"></a><a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"></a><a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"></a>
			</nav>
		</figcaption>				
		<img src="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>"/>
	</figure>
	<?php if(strlen(get_the_content()) >= 5){ ?>
	<div class="wrap the_content illustration-content">
		<?php the_content(); ?>
	</div>
	<?php } ?>
	<nav class="wrap nav-more">
		<hr/>
		<h3 class="align-center">More <a href="<?php echo $illustrationLink; ?>">Illustration</a></h3>	
		<section class="gallery gallery-nav clearfix">
			<?php
				$prev_post = get_previous_post();
				$srcImgPrev = wp_get_attachment_image_src( get_post_thumbnail_id($prev_post->ID), 'illustration-thumb');
				$next_post = get_next_post();
				$srcImgNext = wp_get_attachment_image_src( get_post_thumbnail_id($next_post->ID), 'illustration-thumb');
			?>
			<?php if (!empty( $next_post )){ ?>
			<figure>
		        <?php 
				echo '<img class="illustration-thumb-img" src="' . $srcImgNext[0] .'">';
				?>
				<a href="<?php echo get_permalink($next_post->ID); ?>">
					<figcaption>
						<p>Previous:</p>
						<h2><?php echo get_the_title($next_post->ID); ?></h2>
					</figcaption>
				</a>							
			</figure>
			<?php } else{ ?>
				<div class="empty"></div>
			<?php } ?>
			<?php if (!empty( $prev_post )){ ?>
			<figure>
		        <?php 
				echo '<img class="illustration-thumb-img" src="' . $srcImgPrev[0] .'">';
				?>
				<a href="<?php echo get_permalink($prev_post->ID); ?>">
					<figcaption>
						<p>Next:</p>
						<h2><?php echo get_the_title($prev_post->ID); ?></h2>
					</figcaption>
				</a>							
			</figure>
			<?php } else{ ?>
				<div class="empty"></div>
			<?php } ?>	
		</section>
	</nav>
<?php endwhile; endif; ?>
</article>

<?php get_footer(); ?>