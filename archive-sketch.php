<?php
 /*Template Name: Illustration
 */
get_header(); ?>
	<?php
	 	$titleShare = 'Sketchbook';
	 	$descriptionShare = 'Some ideas, some drawings. Many of them fail to materialize into a final work, others do. But they are almost always the first and essential step in my workflow.';
	 	$urlImageShare = url_thumbnail('sketchbook-image');
	 ?>
	<link href='http://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
	<script type="text/javascript">pageID = 'sketch-list';</script>
	<article class="sketch-list <?php echo $flavor;?>  page">
		<header class="panel">
			<div class="text-box align-center">
				<h1>Sketchbook</h1>
				<p>Nunc elementum diam scelerisque, volutpat enim at, dapibus mauris. Sed et metus et magna bibendum congue non id nunc. Donec at augue aliquet, sollicitudin orci non, porta nunc. Integer vitae condimentum felis.</p>								
			</div>			
		</header>
		<section class="sketchbook-container">
			<div class="sketchbook-fold">
				<ul class="sketchbook">

			<?php
			$par = 1;
			$list = new WP_Query('post_type=sketch&posts_per_page=60');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>

			<?php if($par == 1){ 
				echo '<li class="sk-page">';
			} ?>
				<div class="sk-face" id="sketch-<?php the_ID();?>" alt="<?php the_title();?>">
					<div class="loading-sketch-banner">Loading...</div>
					<?php if(has_post_thumbnail()){
						echo '<img class="sketchbook-img" src="" srcwait="' . url_thumbnail('sketchbook-image') .'">';
					} ?>
					<div class="sk-face-content">
						<?php the_content(); ?>
					</div>					
				</div>
			<?php if($par == -1){ ?>
					<img class="sketchbook-page-bg" src="<?php bloginfo('template_url');?>/img/sketchbook/sketchbook-page-bg.png">
				</li>
			<?php } 
				$par *= -1;
			?>

			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>

			<?php if($par == -1){ ?>
					<div class="sk-face"></div>
					<img class="sketchbook-page-bg" src="<?php bloginfo('template_url');?>/img/sketchbook/sketchbook-page-bg.png">
				</li>
			<?php } ?>

			<?php else :?>
				<li class="sk-page">
					<div class="sk-face">
						<p>Sorry, sketches not found!</p>
					</div>
					<div class="sk-face"></div>
					<img class="sketchbook-page-bg" src="<?php bloginfo('template_url');?>/img/sketchbook/sketchbook-page-bg.png">
				</li>
			<?php endif; ?>
				</ul>
				<img class="sketchbook-fold-bg" src="<?php bloginfo('template_url'); ?>/img/sketchbook/sketchbook-fold-bg.jpg">
			</div>	
		</section>
	</article>
	<nav class="post-navigation in-left">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>
	</nav>
<?php get_footer(); ?>