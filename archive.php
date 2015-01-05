<?php get_header(); ?>
	<article class="article-main">		
		<header class="header-article wrap">
			<?php $cat_name = single_cat_title('',false);?>
			<h1>
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
				<p>My portfolio is my best presentation. In my work as an illustrator and artist you are going to find a variety of styles: conceptual, fantastic, literary, realistic, functional design, video games, etc.</p>		
		</header>		
		<section class="blog-list wrap">
			<div class="row">
				<?php if (have_posts()) :?>
				<?php while (have_posts()) : the_post();?>
				<div class="col">
					<div class="post-in-list" id="post-<?php the_ID();?>">
						<figure>
							<?php if(has_post_thumbnail()){
								the_post_thumbnail('thumbnail');
								}else{ ?>
									<img src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />		
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
<?php get_footer(); ?>