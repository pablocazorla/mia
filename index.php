<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>
	<article id="article-main" class="home">
		<?php if ($async){?>
			<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
		<?php } ?>
		<div class="invisible" id="page-data" data-menu="" data-page="home"></div>
		<header class="header-home">
			<div class="header-home-content">
				<div class="wrap">
					<h1 class="show-1 soft-light slg-bottom" id="slide-title">
						<span class="slide-title-1">I am Illustrator</span>
						<span class="slide-title-2">I am Designer</span>
						<span class="slide-title-3">I am Artist</span>
						<span class="slide-title-4">I am Webdesigner</span>
					</span></h1>
					<div class="red-line soft-light slg-bottom"></div>			
					<p class="subtitle soft-light slg-bottom">
						I am Pablo and my job is to create awesomes images, usefull web sites and beautiful art.
					</p>				
				</div>
			</div>
		</header>
		<section class="home-welcome pc-init">
			<div id="h-scroll" title="Scroll down" class="bubble"><img src="<?php bloginfo('template_url'); ?>/img/h-down.png"></div>
			
			<div class="wrap">
				<p class="p-welcome soft-light slg-bottom">Welcome to my site-portfolio.</p>
				<p class="soft-light slg-bottom">You will find part of my work as web designer, UX analyst, and illustrator. Also, I share some ideas, tutorials and resources in my blog.</p>
				<p class="soft-light slg-bottom">Enjoy and get in touch!</p>
			</div>
		</section>
		<section class="home-create pc-init">
			<div class="wrap home-create-container">
				<h2>I create works in two main areas</h2>
				<div class="clearfix home-create-areas">
					<div class="home-create-col hc-col-1">
						<img src="<?php bloginfo('template_url'); ?>/img/icon-ilustration.png">
						<h3><a href="">Illustration</a></h3>
						<p>Digital painting, fantasy illustration, concept art, matte-painting, traditional media art (oils, watercolors), books, games, logos, icons.</p>
					</div>
					<div class="home-create-col hc-col-2">
						<img src="<?php bloginfo('template_url'); ?>/img/icon-design.png">
						<h3><a href="">Design</a></h3>
						<p>Web design and UX improvement, UI development (HTML5, CSS3, Javascript), mobile design, e-commerce, infographics, identity and branding</p>
					</div>
				</div>
				
			</div>
			<figure class="pablo-pic soft-light slg-bottom">					
				<img class="pablo-pic-img-2" src="<?php bloginfo('template_url'); ?>/img/pablo-2.png">
				<img class="pablo-pic-img-1" src="<?php bloginfo('template_url'); ?>/img/pablo.png">
			</figure>
		</section>
		<section class="home-last-work">
			<div class="wrap">
				<h2 class="soft-light slg-bottom">My last work</h2>
				<p class="soft-light slg-bottom">What I've done the last time</p>			
				<div class="gallery gallery-nav clearfix">
					<?php
					$list = new WP_Query('post_type=illustration&posts_per_page=1');
					if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>
					<figure class="soft-light slg-bottom">
				        <?php if(has_post_thumbnail()){
							echo '<img class="illustration-thumb-img srcwait" src="" srcwait="' . url_thumbnail('illustration-thumb') .'">';
						} ?>
						<a href="<?php the_permalink(); ?>">
							<figcaption>
								<p>Illustration</p>
								<h2><?php the_title(); ?></h2>
							</figcaption>
						</a>							
					</figure>
					<?php endwhile; 
					wp_reset_postdata(); 
					endif;
					$list = new WP_Query('post_type=design&posts_per_page=1');
					if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>
					<figure class="soft-light slg-bottom">
				        <?php if(has_post_thumbnail()){
							echo '<img class="illustration-thumb-img srcwait" src="" srcwait="' . url_thumbnail('illustration-thumb') .'">';
						} ?>
						<a href="<?php the_permalink(); ?>">
							<figcaption>
								<p>Design</p>
								<h2><?php the_title(); ?></h2>
							</figcaption>
						</a>							
					</figure>
					<?php endwhile; 
					wp_reset_postdata(); 
					endif; ?>
				</div>
			</div>
		</section>
		<section class="home-photo">

		</section>
	</article>
<?php
if (!$async){
	get_footer();
} ?>