<?php
/***********************************************
* MENUS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'nav-menus' );

	register_nav_menus(array(
		'primary' => 'Primary Navigation'
));

/***********************************************
* POST THUMBNAILS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'post-thumbnails' );

/* Custom image sizes */
add_image_size( 'custom-thumb', 470, 470, array( 'center', 'top' ) );
add_image_size( 'custom-medium', 1200, 10000, false);
add_image_size( 'custom-large', 1880, 15000, false);

/* URL THUMBNAILS */
function url_thumbnail($tamagno){
	$src = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), $tamagno);
	return $src[0];
}

// Override img caption shortcode to fix 10px issue.
function fix_img_caption_shortcode($val, $attr, $content = null) {
    extract(shortcode_atts(array(
        'id'    => '',
        'align' => '',
        'width' => '',
        'caption' => ''
    ), $attr));

    if ( 1 > (int) $width || empty($caption) ) return $val;

    return '<div id="' . $id . '" class="wp-caption ' . esc_attr($align) . '" style="max-width: ' . (0 + (int) $width) . 'px">' . do_shortcode( $content ) . '<p class="wp-caption-text">' . $caption . '</p></div>';
}
add_filter('img_caption_shortcode', 'fix_img_caption_shortcode', 10, 3);

/***********************************************
* CUSTOM LENGTH EXCERPT
***********************************************/
function custom_excerpt_length( $length ) {
    global $post;
    if ($post->post_type == 'post'){
        return 14;
    } else if ($post->post_type == 'illustration'){
        return 50;
    }
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

/**********************************************
* To remove <p> before category description
**********************************************/
remove_filter('term_description','wpautop');

/***********************************************
* CUSTOM TYPE: ILLUSTRATION
***********************************************/
function create_illustration_type() {
  $args = array(
    'labels' => array(
      'name' => 'Illustrations',
      'singular_name' => 'Illustration'
    ),
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
    'hierarchical' => false,
    'show_tagcloud' => false,
    'show_in_nav_menus' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-format-gallery',
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'custom-fields' )
  ); 
  register_post_type('illustration',$args);
}
add_action( 'init', 'create_illustration_type' );

// Illustration Types
function create_illustration_taxonomies() {
    register_taxonomy(
        'illustration',
        'illustration',
        array(
            'labels' => array(
                'name' => 'Illustration Types',
                'singular_name' => 'Illustration Type'
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true,
            'show_in_nav_menus' => true
        )
    );
}
add_action( 'init', 'create_illustration_taxonomies', 0 );

/***********************************************
* SIDEBAR
***********************************************/
function sidebar_init() {
    // Area 1, located at the top of the sidebar.
    register_sidebar( array(
        'name' => 'Primary Widget',
        'id' => 'primary-widget-area',
        'description' => 'The primary widget area',
        'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
        'after_widget' => '</li>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ) );
    // Area 2, located below the Primary Widget Area in the sidebar. Empty by default.
    register_sidebar( array(
        'name' => 'Secondary Widget',
        'id' => 'secondary-widget-area',
        'description' => 'The secondary widget area',
        'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
        'after_widget' => '</li>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ) );
}
add_action( 'widgets_init', 'sidebar_init' );
add_theme_support( 'html5', array( 'search-form' ) );

?>