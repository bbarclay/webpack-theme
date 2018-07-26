<?php



/**
 * Enqueue admin stylesheets.
 */
function cascade_enqueue_fonts( $hook ) {
	
	wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/css/main.min.css' );
	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/assets/js/main.min.js', array(), false, true );
	
}
add_action( 'wp_enqueue_scripts', 'cascade_enqueue_fonts' );
