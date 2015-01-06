<?php
/***********************************************
* REMOVE ADMIN BAR
***********************************************/
add_filter('show_admin_bar', '__return_false');

/***********************************************
* MENUS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'nav-menus' );

    register_nav_menus( array(
        'primary' => 'Primary Navigation',
        'secondary' => 'Illustration Navigation',
        'tertiary' => 'Design Navigation',
        'quaternary' => 'Blog Navigation'
) );
/***********************************************
* NAVIGATION
***********************************************/
function pc_category_link($name){
    $c_id_blog = get_cat_ID( $name );
    $c_link_blog = get_category_link( $c_id_blog );
    return $c_link_blog;
}
add_filter('next_posts_link_attributes', 'next_posts_link_class');
add_filter('previous_posts_link_attributes', 'previous_posts_link_class');

function next_posts_link_class() {
    return 'class="next-post"';
}
function previous_posts_link_class() {
    return 'class="prev-post"';
}
add_filter('next_post_link', 'next_post_link_class');
add_filter('previous_post_link', 'previous_post_link_class');
 
function next_post_link_class($output) {
    $code = 'class="prev-post"';
    return str_replace('<a href=', '<a '.$code.' href=', $output);
}
function previous_post_link_class($output) {
    $code = 'class="next-post"';
    return str_replace('<a href=', '<a '.$code.' href=', $output);
}

/***********************************************
* POST THUMBNAILS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'post-thumbnails' );

/* Illustration image sizes */
add_image_size( 'illustration-thumb', 635, 320, array( 'center', 'top' ));
add_image_size( 'illustration-large', 1200, 15000, false);

/* Design image size */
add_image_size( 'design-thumb', 635, 320, array( 'center', 'top' ));
add_image_size( 'design-large', 1200, 15000, false );

/* Sketch image size */
add_image_size( 'sketchbook-image', 540, 620, array( 'center', 'top' ) );

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
* Desaturate Image Style
***********************************************/
function desaturateImageStyle(){
      echo '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="invisible"><filter id="greyscale"><feColorMatrix in="SourceGraphic" type="saturate" values="0.5" /></filter></svg><style type="text/css">img.desaturate {-webkit-filter: grayscale(0.5);-webkit-filter: grayscale(50%);-moz-filter: grayscale(50%);filter: gray; filter: grayscale(50%);filter: url(#greyscale);}</style>';
}

/***********************************************
* Custom values
***********************************************/
function customVal($keyVal){
    echo get_post_custom($post->ID)[$keyVal][0];
}

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
* CUSTOM TYPE: SKETCH
***********************************************/
function create_sketch_type() {
  $args = array(
    'labels' => array(
      'name' => 'Sketches',
      'singular_name' => 'Sketch'
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
    'menu_icon' => 'dashicons-edit',
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'custom-fields' )
  ); 
  register_post_type('sketch',$args);
}
add_action( 'init', 'create_sketch_type' );

// Sketch Types
function create_sketch_taxonomies() {
    register_taxonomy(
        'sketch',
        'sketch',
        array(
            'labels' => array(
                'name' => 'Sketch Types',
                'singular_name' => 'Sketch Type'
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true,
            'show_in_nav_menus' => true
        )
    );
}
add_action( 'init', 'create_sketch_taxonomies', 0 );

/***********************************************
* CUSTOM TYPE: DESING
***********************************************/
function create_design_type() {
  $args = array(
    'labels' => array(
      'name' => 'Designs',
      'singular_name' => 'Design'
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
    'menu_position' => 6,
    'menu_icon' => 'dashicons-desktop',
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'custom-fields' )
  ); 
  register_post_type('design',$args);
}
add_action( 'init', 'create_design_type' );

// Design Types
function create_design_taxonomies() {
    register_taxonomy(
        'design',
        'design',
        array(
            'labels' => array(
                'name' => 'Design Types',
                'singular_name' => 'Design Type'
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true,
            'show_in_nav_menus' => true
        )
    );
}
add_action( 'init', 'create_design_taxonomies', 0 );

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