<?php
/**
* The Sidebar containing the primary and secondary widget areas.
*/
?>
<div class="sidebar-content">
	<ul class="widgets-list">
		<?php if ( ! dynamic_sidebar( 'primary-widget-area' ) ) : ?>
		<li class="widget-container widget_search">
			<?php get_search_form(); ?>
		</li>
		<?php endif; // end primary widget area ?>

		<?php if ( ! dynamic_sidebar( 'secondary-widget-area' ) ) : ?>
		<li class="widget-container widget_archives">
			<h3 class="widget-title">Archives</h3>
			<ul>
				<?php wp_get_archives( 'type=monthly' ); ?>
			</ul>
		</li>
		<?php endif; ?>
	</ul>
</div>
