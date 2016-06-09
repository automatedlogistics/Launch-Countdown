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
            
            // Plugin version
            define( 'ALS_Countdown_VER', '1.0.0' );
            
            // Plugin version
            define( 'ALS_Countdown_ID', 'alscountdown' );
            
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
            
            add_action( 'init', array( $this, 'register_scripts' ) );
            add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
            
            add_action( 'wp_head', array( $this, 'pre_launch_overlay' ) );
            
        }
        
        /**
         * Register Stylec/Scripts for later use
         * @since       1.0.0
         * @return      void
         */
        public function register_scripts() {
            
            wp_register_style(
                ALS_Countdown_ID,
                ALS_Countdown_URL . '/style.css',
                null,
                defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : ALS_Countdown_VER
            );
            
            wp_register_script(
                ALS_Countdown_ID,
                ALS_Countdown_URL . '/script.js',
                array( 'jquery' ),
                defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : ALS_Countdown_VER,
                true
            );
            
        }
        
        /**
         * Enqueue Stylec/Scripts for the frontend
         * @since       1.0.0
         * @return      void
         */
        public function enqueue_frontend_scripts() {
            
            wp_enqueue_style( ALS_Countdown_ID );
            
            wp_enqueue_script( ALS_Countdown_ID );
            
        }
        
        /**
         * Inject Pre-Launch Overlay
         * @since       1.0.0
         * @return      void
         */
        public function pre_launch_overlay() {
            
            
            
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