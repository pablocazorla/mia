<?php $async = $_GET['async'];
if (!$async){
	get_header();
} ?>
	<article class="article-main article-blog article-list">
		<?php if ($async){?>
			<div id="hidden-title" class="invisible"><?php get_page_title(); ?></div>
		<?php } ?>
		<div class="invisible" id="page-data" data-page="blog"></div>
		<section id="blog" class="wrap blog-list">
			<header class="wrap header-section">
			<?php $cat_name = single_cat_title('',false);?>
				<h1 class="soft-light slg-bottom">
					<?php if(is_category()):
						echo $cat_name; 
					elseif(is_tag()):
						echo "Tag <i>".$cat_name."</i>"; 
					elseif(is_author()):
						echo "Author: <i>".$cat_name."<i>"; 
					elseif(is_archive()):
						echo "On archive <i>".$cat_name."<i>";
					endif; ?>
				</h1>
				<div class="red-line softlight"></div>
				<p class="softlight">
				<?php 
					if($cat_name != 'Blog'){
						echo '<p class="subtitle soft-light slg-bottom"><a href="' . pc_category_link('Blog') . '">Blog</a></p>';
					}else{
						echo category_description();
					}
					?>
				</p>
			</header>		
			<div class="blog-list-side soft-light slg-bottom">
				<div class="row">
					<div class="col col-6">
						<?php include (TEMPLATEPATH . '/menublog.php'); ?>
					</div>
					<div class="col col-6">
						<?php get_search_form(); ?>
					</div>
				</div>
			</div>
			<div class="row">
	<?php if (have_posts()) :?>
					<?php while (have_posts()) : the_post();?>
				<div class="col">
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
				<?php endwhile; ?>
				<?php else :?>
				<div class="col col-12">
					<h2>Sorry, posts not found</h2>
				</div>				
				<?php endif; ?>
			</div>			
		</section>
		<?php if ( $wp_query->max_num_pages > 1 ){ ?>
		<nav class="blog-pagination">
			<div class="wrap clearfix">
				<div class="blog-pagination-arrow to-left">
					<?php previous_posts_link('&lt; Previous Posts'); ?>
				</div>
				<div class="blog-pagination-arrow to-right">				
					<?php next_posts_link('Next Posts &gt;');	?>
				</div>
			</div>
		</nav>
		<?php } ?>		
	</article>	
<?php
if (!$async){
	get_footer();
} ?>