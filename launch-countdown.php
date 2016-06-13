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
            add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_widget_control_scripts' ) );
            
            add_action( 'widgets_init', array( $this, 'register_sidebar' ) );
            add_action( 'widgets_init', array( $this, 'include_widget' ) );

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
            
            wp_register_style(
                ALS_Countdown_ID . '-widget-controls-css',
                ALS_Countdown_URL . '/widget-controls.css',
                null,
                defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : ALS_Countdown_VER
            );
            
            wp_register_script(
                ALS_Countdown_ID . '-widget-controls-js',
                ALS_Countdown_URL . '/widget-controls.js',
                array( 'jquery' ),
                defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : ALS_Countdown_VER,
                false
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
        
        public function enqueue_widget_control_scripts() {
            
            wp_enqueue_style( ALS_Countdown_ID . '-widget-controls-css' );
            
            wp_enqueue_script( ALS_Countdown_ID . '-widget-controls-js' );
            
        }

        /**
         * Retrieve the name of the highest priority template file that exists.
         *
         * Searches in the STYLESHEETPATH before TEMPLATEPATH so that themes which
         * inherit from a parent theme can just overload one file. If the template is
         * not found in either of those, it looks in the theme-compat folder last.
         *
         * Taken from bbPress
         *
         * @access      public
         * @since       1.0
         *
         * @param       string|array $template_names Template file(s) to search for, in order.
         * @param       bool $load If true the template file will be loaded if it is found.
         * @param       bool $require_once Whether to require_once or require. Default true. Has no effect if $load is false.
         * @return      string The template filename if one is located.
         */
        public static function locate_template( $template_names, $load = false, $require_once = true ) {

            // No file found yet
            $located = false;
            // Try to find a template file
            foreach ( ( array )$template_names as $template_name ) {
                // Continue if template is empty
                if ( empty( $template_name ) )
                    continue;
                // Trim off any slashes from the template name
                $template_name = ltrim( $template_name, '/' );
                if ( file_exists( trailingslashit( get_stylesheet_directory() ) . 'als-countdown/' . $template_name ) ) {
                    // Check child theme first
                    $located = trailingslashit( get_stylesheet_directory() ) . 'als-countdown/' . $template_name;
                    break;
                }
                elseif ( file_exists( trailingslashit( get_template_directory() ) . 'als-countdown/' . $template_name ) ) {
                    // Check parent theme next
                    $located = trailingslashit( get_template_directory() ) . 'als-countdown/' . $template_name;
                    break;
                }
                elseif ( file_exists( trailingslashit( ALS_Countdown_DIR ) . 'templates/' . $template_name ) ) {
                    // Check plugin directory last
                    $located = trailingslashit( ALS_Countdown_DIR ) . 'templates/' . $template_name;
                    break;
                }

            }
            if ( ( true == $load ) && ! empty( $located ) )
                load_template( $located, $require_once );
            return $located;

        }

        /**
         * Include basic Sidebar for our Overlay
         * @since       1.0.0
         * @return       void
         */
        public function register_sidebar() {

            register_sidebar( array(
                'name' => __( 'Countdown Overlay', ALS_Countdown_ID ),
                'id' => 'als-countdown-sidebar',
                'description' => __( 'This is where we create our Countdown Sidebar.', ALS_Countdown_ID ),
            ) );

        }
        
        /**
         * Include our custom Widget
         * @since       1.0.0
         * @return      void
         */
        public function include_widget() {
            
            require_once( 'includes/widget-countdown.php' );
            register_widget( 'ALS_Countdown_Widget' );
            
        }

        /**
         * Inject Pre-Launch Overlay
         * @since       1.0.0
         * @return      void
         */
        public function pre_launch_overlay() {
            
            // Generally only Admins have this Capability
            // Retains the ability to load on the backend
            if ( ! current_user_can( 'manage_options' ) || is_customize_preview() ) {

                $this->locate_template( 'overlay.php', true );
                
            }

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