<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>

<article class="article-main">
	<?php if ($async){?>
		<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
	<?php } ?>
	<div class="invisible" id="page-data" data-menu="" data-page="single-design"></div>
<?php 
desaturateImageStyle();
if (have_posts()) : while (have_posts()) : the_post();
$titleShare = get_the_title();
$descriptionShare = get_the_excerpt();
$urlImageShare = url_thumbnail('design-large');
$designLink = get_post_type_archive_link('design');
?>

	<header class="header-article header-article-design-post in-single">		
		<img class="header-article-img desaturate wait-complete" src="<?php if(has_post_thumbnail()){ echo url_thumbnail('design-large');} ?>"/>
		<div class="wrap header-article-content">
			<h1 class="soft-light slg-bottom"><?php echo $titleShare;?></h1>
			<div class="red-line soft-light slg-bottom"></div>
			<p class="subtitle soft-light slg-bottom"><a href="<?php echo $designLink; ?>">Design</a></p>	
		</div>
	</header>
	<div class="wrap design-cite">		
		<p class="cite soft-light slg-bottom"><?php echo $descriptionShare;?></p>			
		<nav class="share-nav soft-light slg-bottom">	
			<a href="" class="share link-facebook" data-share="{'on':'facebook'}"></a><a href="" class="share link-google" data-share="{'on':'google'}"></a><a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"></a><a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"></a>
		</nav>				
	</div>
	<?php if(strlen(get_the_content()) >= 5){ ?>
	<hr class="wrap"/>
	<div class="wrap the_content design-content">
		<?php the_content(); ?>
	</div>
	<?php } ?>
	<nav class="wrap nav-more">
		<hr/>
		<h3 class="align-center soft-light slg-bottom">More <a href="<?php echo $designLink; ?>">Design</a></h3>	
		<section class="gallery gallery-nav clearfix">
			<?php
				$prev_post = get_previous_post();
				$srcImgPrev = wp_get_attachment_image_src( get_post_thumbnail_id($prev_post->ID), 'design-thumb');
				$next_post = get_next_post();
				$srcImgNext = wp_get_attachment_image_src( get_post_thumbnail_id($next_post->ID), 'design-thumb');
			?>
			<?php if (!empty( $next_post )){ ?>
			<figure class="soft-light slg-bottom">
		        <?php 
				echo '<img class="design-thumb-img wait-complete" src="' . $srcImgNext[0] .'">';
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
			<figure class="soft-light slg-bottom">
		        <?php 
				echo '<img class="design-thumb-img wait-complete" src="' . $srcImgPrev[0] .'">';
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

<?php
if (!$async){
	get_footer();
} ?>