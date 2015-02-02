<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>

<article class="article-main article-design article-post">
	<?php if ($async){?>
		<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
	<?php } ?>
	<div class="invisible" id="page-data" data-menu="" data-page="error404"></div>
	<section id="error404" class="error404-post">
		<header class="header-section dark">
			<img class="header-section-background auto wait" src="<?php bloginfo('template_url'); ?>/img/error404.jpg"/>

			<div class="wrap">
				<h1 class="softlight">
					Error 404
				</h1>
				<div class="red-line softlight"></div>
				<p class="softlight">
					Nothing found!		
				</p>				
			</div>
		</header>
		<div class="wrap the-content error404-content">
			<h3>You can try to find the content via the Search box:</h3>
			<?php get_search_form(); ?>
			<hr/>
		</div>
	</section>	
</article>
<?php
if (!$async){
	get_footer();
} ?>