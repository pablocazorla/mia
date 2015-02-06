<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>
<article class="article-main">
	<?php if ($async){?>
		<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
	<?php } ?>
	<div class="invisible" id="page-data" data-menu="" data-page="home"></div>
	<section id="presentation">
		<img id="presentation-hand" src="<?php bloginfo('template_url'); ?>/img/profile-hand.jpg">
		<div id="presentation-text">
			<div class="presentation-brand">
				<div class="presentation-brand-title">Pablo Cazorla</div>
				<div class="presentation-brand-subtitle">I&#8216;m illustrator, web designer and graphic artist</div>
			</div>
			<div class="presentation-line"></div>
			<div class="presentation-menu">
				<?php render_menu(); ?>
			</div>
		</div>
		<img id="presentation-triang" src="<?php bloginfo('template_url'); ?>/img/profile-hand-triang.png">
	</section>
	<section id="what-i-do">
		<div class="wrap">
			<h2 class="softlight">What I do</h2>
			<div class="red-line softlight"></div>
			<div class="row">
				<div class="col col-6">
					<div class="wid-col wid-col-illustration">
						<div class="wid-icon softlight" data-softlight="y:0,delay:200"></div>
						<h3 class="softlight">Illustration</h3>
						<p class="softlight">Digital painting, fantasy illustration, concept art, matte-painting, traditional media art (oils, watercolors), books, games, logos, icons.</p>
					</div>					
				</div>
				<div class="col col-6">
					<div class="wid-col wid-col-design">
						<div class="wid-icon softlight" data-softlight="y:0,delay:200"></div>
						<h3 class="softlight">Design</h3>
						<p class="softlight">Web design and UX improvement, UI development (HTML5, CSS3, Javascript), mobile design, e-commerce, infographics, identity and branding</p>
					</div>
				</div>
			</div>
		</div>		
	</section>
	<section id="illustration">
		<header class="wrap header-section">
			<h1 class="softlight">Illustration</h1>
			<div class="red-line softlight"></div>
			<p class="softlight">Conceptual, fantastic, literary, realistic, functional, games...</p>
		</header>
		<div id="illustration-gallery" class="clearfix">
<?php $list = new WP_Query('post_type=illustration&posts_per_page=6');
if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>

			<figure class="illustration-figure softlight selected">
		        <?php if(has_post_thumbnail()){
					echo '<img class="auto img-sequence" src="" data-src="' . url_thumbnail('illustration-thumb') .'">';
				} ?>
				<a href="<?php the_permalink(); ?>" data-blank="black">
					<figcaption>						
						<h2><?php the_title(); ?></h2>
						<p>Concept art</p>
					</figcaption>
				</a>							
			</figure>

<?php endwhile; 
wp_reset_postdata(); 
endif;
?>
		</div>
		<div class="view-all">
			<a href="<?php echo get_post_type_archive_link('illustration');?>" class="softlight" data-softlight="y:0" data-blank="black">View all Illustration</a>
		</div>		
	</section>
	<section id="design">
		<header class="wrap header-section">
			<h1 class="softlight">Design</h1>
			<div class="red-line softlight"></div>
			<p class="softlight">UI/UX, web, infographics, applications...</p>
		</header>
		<div id="design-gallery">
<?php
$alt = -1;
$backCol = 1;
$list = new WP_Query('post_type=design&posts_per_page=4');
if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); 			
$alt *= -1;
$backCol += 1;
if($backCol > 8){
	$backCol = 1;
}
$types = get_the_terms( $post->ID, 'design' );
$className = '';
$classType = '';									
if ( $types && ! is_wp_error( $types ) ) {
	foreach ( $types as $type ) {
		$className = $type->name;
		$classType = $classType." ".str_replace(" ","-",strtolower($type->name));
	}
}
?>

			<div class="gallery-fig softlight <?php echo ' backcolor'.$backCol; echo $classType; if($alt < 0){ echo ' alt';}?>" data-softlight="rotateY:90,from:-20">
				<div class="wrap">
					<div class="clearfix design-pod">
						<div class="design-box design-image">
							<?php if($classType == ' webdesign'){ ?>
							<img class="design-pc" src="<?php bloginfo('template_url'); ?>/img/design-pc.png"/>
							<?php }?>
							<figure class="<?php if($classType == ' webdesign'){echo 'wd-figure';}?>">
						        <?php if(has_post_thumbnail()){
								echo '<img class="design-thumb-img img-sequence" src="" data-src="' . url_thumbnail('design-thumb') .'">';
								} ?>
								<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" >
									<figcaption><span>More</span></figcaption>
								</a>							
							</figure>										
						</div>
						<div class="design-box design-gap"></div>
						<div class="design-box design-text">
							<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
							<p class="design-category"><?php echo $className;?></p>
							<?php the_excerpt();?>
						</div>
					</div>
				</div>
			</div>

<?php endwhile; 
wp_reset_postdata(); 
endif;
?>
		</div>
		<div class="view-all">
			<a href="<?php echo get_post_type_archive_link('design');?>" class="softlight" data-softlight="y:0">View all Design</a>
		</div>		
	</section>
	<section id="blog" class="wrap blog-list">
		<header class="wrap header-section">
			<h1 class="softlight">Blog</h1>
			<div class="red-line softlight"></div>
			<p class="softlight">Ideas, resources, news, tutoriales, discussion...</p>
		</header>
		<div class="row">
<?php 
$order = 1;
$list = new WP_Query('posts_per_page=3');
if ($list->have_posts()): while ($list->have_posts()): $list->the_post(); ?>
			<div class="col col-num-<?php echo $order; ++$order;?>">
				<div class="post-in-list softlight" data-softlight="y:0,scale:0.7" id="post-<?php the_ID();?>">
					<figure>
						<?php if(has_post_thumbnail()){
							echo '<img class="img-sequence" src="" data-src="' . url_thumbnail('thumbnail') .'">';
							}else{ ?>
								<img class="img-sequence" src="" data-src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />		
							<?php } ?>							
						<a href="<?php the_permalink(); ?>">
							<span>More</span>
						</a>
					</figure>						
					<div class="post-caption">
						<h2>
							<a href="<?php the_permalink(); ?>">					
								<?php the_title(); ?>
							</a>
						</h2>
						<div class="category">
							<?php the_category(', '); ?>					
						</div>
						<?php the_excerpt(); ?>
					</div>
				</div>
			</div>
<?php endwhile; 
wp_reset_postdata(); 
endif;
?>
		</div>
		<div class="view-all">
			<a href="<?php echo pc_category_link('Blog');?>" class="softlight" data-softlight="y:0">View all Blog posts</a>
		</div>
	</section>
	<section id="about-me">
		<img id="about-img" class="wait-complete" src="<?php bloginfo('template_url'); ?>/img/about.jpg"/>
		<div id="about-text">
			<div class="wrap">
				<div class="about-col softlight">
					<?php show_post_content('me'); ?>
				</div>					
			</div>
		</div>
	</section>
</article>
<?php
if (!$async){
	get_footer();
} ?>