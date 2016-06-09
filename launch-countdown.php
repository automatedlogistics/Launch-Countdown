<?php
/*
Plugin Name: ALS Launch Countdown
Description: Countdown Overlay for ALS v1.0 Site Launch
Version: 1.0.0
Text Domain: alscountdown
Author: Real Big Marketing
Author URI: http://realbigmarketing.com
Contributors: d4mation
*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'ALS_Countdown' ) ) {
    
    /**
     * Main ALS_Countdown Class
     *
     * @since   1.0.0
     */
    class ALS_Countdown {
        
        /**
         * @var     ALS_Countdown instance
         * @since   1.0.0
         */
        private static $instance;
        
        /**
         * Creates instance of our Class
         * @return object self::$instace Our Instance
         */
        public static function instance() {
            
            if ( ! self::$instance ) {
                self::$instance = new ALS_Countdown();
                self::$instance->setup_constants();
                self::$instance->hooks();
            }
            
            return self::$instance;
            
        }
        
        /**
         * Setup plugin constants
         * @since       1.0.0
         * @return      void
         */
        private function setup_constants() {
            
            // Plugin path
            define( 'ALS_Countdown_DIR', plugin_dir_path( __FILE__ ) );
            
            // Plugin URL
            define( 'ALS_Countdown_URL', plugin_dir_url( __FILE__ ) );
            
        }
        
        /**
         * Run action and filter hooks
         * @since       1.0.0
         * @return      void
         */
        private function hooks() {
            
            
            
        }
        
    } // End ALS_Countdown Class
    
} // End Class Exists Check

/**
 * The Main Function responsible for returning our Instance
 * @since       1.0.0
 * @return      \ALS_Countdown Our Class Instance
 */
add_action( 'plugins_loaded', function() {
    
    return ALS_Countdown::instance();
    
} );