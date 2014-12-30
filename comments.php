<?php // Do not delete these lines
if('comments.php' == basename($_SERVER['SCRIPT_FILENAME'])){
	die ('Please do not load this page directly. Thanks!');
	if(!empty($post->post_password)) {
		if($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) {
?>
			<p class="nocomments">Post protected.</p>
<?php
			return;
		}
	}
}
?>
<a id="comments" name="comments" class="anchor"></a>
<h2 id="commentlist-title"><?php comments_number('No comments yet', '1 comment', '% comments');?></h2>
<ul id="commentlist">
	<?php if($comments){ //INICIA COMENTARIOS?>
		<?php wp_list_comments('avatar_size=48&type=comment&reply_text='); ?>
	<?php };?>
</ul>

<div id="adding-comment" class="adding-comment" style="display:none">
	<span class="loader-graph small"></span> Adding comment...
</div>
<div id="adding-comment-error"  class="adding-comment" style="display:none">
	Error. Please, try again.
</div>
<a id="respond" name="respond" class="anchor"></a>
<?php if ('open' == $post->comment_status){ //INICIA FORMULARIO PARA COMENTARIOS - Si estan abiertos ?>
		
		
<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">
	<h3>Add comment</h3>
	<?php if ( $user_ID ){ //Si SI esta logueado ?>

		<p>You are logged as <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a> | <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="Logout">Logout »</a></p>

	<?php }else{ //Si NO esta logueado ?>
		
		<fieldset id="authorField" class="validate" data-min="3">							
			<input type="text" name="author" id="author" value="<?php echo $comment_author; ?>" tabindex="1" placeholder="Name"/>
			<div class="errorMessage" style="display:none;">Please, complete your name</div>					
		</fieldset>
		
		<fieldset id="emailField" class="validate email" data-min="8">										
			<input type="email"" name="email" id="email" value="<?php echo $comment_author_email; ?>" tabindex="2" placeholder="Email"/>
			<div class="errorMessage" style="display:none;">Write a right e-mail</div>				
	<?php } ?>					
		</fieldset>
		
		<fieldset id="commentField" class="validate" data-min="8">											
			<textarea rows="4" name="comment" id="comment" tabindex="3" placeholder="Comment"></textarea>
			<div class="errorMessage" style="display:none;">Please, write some words</div>							
		</fieldset>
		
		<fieldset class="submit-field">			
			<input name="submit" type="submit" id="submit" tabindex="4" title="Send your comment" rel="Sending..." value="Send" />			
			<a id="clearFields" href="">Clear fields</a>
			<input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />	
		<?php do_action('comment_form', $post->ID); ?>
		</fieldset>	
</form>
	

<?php }else{ //Si estan cerrados ?>
<h4 class="closed-comments">The comments are closed for this work</h4>
<?php } ?>
