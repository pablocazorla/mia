<!doctype HTML>
<!--[if IE 7]>    <html class="ie7 ie-lt-8 ie-lt-9 ie-lt-10" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 ie-lt-9 ie-lt-10" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="ie9 ie-lt-10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en"> <!--<![endif]-->
<head>	
	<title><?php get_page_title(); ?></title>
		
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="resource-type" content="document" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="content-language" content="en-us" />
	<meta name="author" content="Pablo Cazorla" />
	<meta name="contact" content="contact@pcazorla.com" />
	<meta name="copyright" content="Designed by Pablo Cazorla - All rights reserved - <?php echo date('Y'); ?>." />

	<link href='http://fonts.googleapis.com/css?family=Raleway:300,400' rel='stylesheet' type='text/css'>
	<link href="<?php bloginfo('template_url'); ?>/style.css" rel="stylesheet" type="text/css" />	
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	
	<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/favicon.ico" />	
	<!--[if lt IE 9]>
	<script src="<?php bloginfo('template_url'); ?>/js/libs/html5-3.4-respond-1.1.0.min.js"></script>
	<script type="text/javascript">
		ltIE9 = true;
	</script>
	<![endif]-->
	<script type="text/javascript">
		baseURL = "<?php bloginfo( 'url' ); ?>";
		baseTemplateURL = "<?php bloginfo('template_url'); ?>";

var disqus_developer = 1; // this would set it to developer mode


	</script>	




	
	<?php wp_head(); ?>	
</head>
<body>
	<header id="header-main">
		<div class="wrap">
			<a href="<?php bloginfo( 'url' ); ?>" class="brand">
				
				<span class="brand-name"><?php bloginfo( 'name' ); ?></span>
				<span class="brand-description"><?php bloginfo( 'description' ); ?></span>
			</a>
			<menu id="main-menu">
				<a class="illustration-menu" href="<?php echo get_post_type_archive_link('illustration');?>"><span>Illustration</span></a>
				<a class="design-menu" href="<?php echo get_post_type_archive_link('design');?>"><span>Design</span></a>
				<a class="sketches-menu" href="<?php echo get_post_type_archive_link('sketch');?>"><span>Sketches</span></a>
				<a class="blog-menu" href="<?php echo pc_category_link('Blog'); ?>"><span>Blog</span></a>
				<a class="about-menu" href="<?php bloginfo( 'url' ); ?>/me/"><span>About Me</span></a>				
				<a class="contact-menu resMenuClose" href="#contact"><span>Contact</span></a>				
			</menu>	
		</div>					
	</header>
	<div id="dim-header"></div>
	<div id="res-menu-btn">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<?php desaturateImageStyle(); ?>
	<div id="content-main">