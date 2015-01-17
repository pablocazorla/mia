<?php
/**
* The Sidebar containing the primary and secondary widget areas.
*/
?>
<div class="sidebar" id="sidebar">
	<ul class="widgets-list">
		<li class="widget-container widget_search">
			<?php get_search_form(); ?>
			<?php include (TEMPLATEPATH . '/menublog.php');?>
		</li>

		<?php if ( ! dynamic_sidebar( 'primary-widget-area' ) ) : ?>
		<li 	class="widget-container widget_archives">
			<h3 class="widget-title">Archives</h3>
			<ul>
				<?php wp_get_archives( 'type=monthly' ); ?>
			</ul>
		</li>
		<?php endif; ?>
		<!--li class="widget-container">
			<a href="<?php bloginfo('rss2_url'); ?>" class="rss-link">RSS feed</a>
		</li-->
	</ul>
</div>
