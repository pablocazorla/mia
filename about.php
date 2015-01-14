<?php
/*
Template Name: About me
*/
?>
<?php get_header(); ?>
	<article class="article-main">
		<div class="invisible" id="page-data" data-menu="about" data-page="single-design"></div>
<?php
desaturateImageStyle();
if (have_posts()) : while (have_posts()) : the_post(); 
$titleShare = get_the_title();
$descriptionShare = 'Page in www.pcazorla.com site';
$urlImageShare = url_thumbnail('large');
?>
		<header class="header-article header-article-page">		
			<img class="header-article-img desaturate" src="<?php if(has_post_thumbnail()){ echo url_thumbnail('large');} ?>"/>
			<div class="wrap header-article-content">
				<h1><?php echo $titleShare;?>eee</h1>				
				<nav class="share-nav">	
					<a href="" class="share link-facebook" data-share="{'on':'facebook'}"></a><a href="" class="share link-google" data-share="{'on':'google'}"></a><a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"></a><a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"></a>
				</nav>
			</div>
		</header>
		<section class="wrap-min the-content page-content">			
			<?php the_content(); ?>
		</section>
		<?php endwhile; else :?>
		<div class="wrap-min">
			<h2>Sorry, post not found</h2>
		</div>		
		<?php endif; ?>
	</article>
<?php get_footer(); ?>