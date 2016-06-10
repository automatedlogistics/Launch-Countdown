<?php

if ( ! class_exists( 'ALS_Countdown_Widget' ) ) {

    class ALS_Countdown_Widget extends WP_Widget {

        /**
         * Register widget with WordPress.
         */
        function __construct() {
            parent::__construct(
                'als_countdown_widget', // Base ID
                __( 'Countdown', ALS_Countdown_ID ), // Name
                array( 
                    'classname' => 'als-countdown-widget',
                    'description' => __( 'A Widget that counts down to a specified date and time.', ALS_Countdown_ID ),
                ) // Args
            );
        }

        public function generate_timezone_list() {
            
            static $regions = array(
                DateTimeZone::AFRICA,
                DateTimeZone::AMERICA,
                DateTimeZone::ANTARCTICA,
                DateTimeZone::ASIA,
                DateTimeZone::ATLANTIC,
                DateTimeZone::AUSTRALIA,
                DateTimeZone::EUROPE,
                DateTimeZone::INDIAN,
                DateTimeZone::PACIFIC,
            );

            $timezones = array();
            foreach ( $regions as $region ) {
                $timezones = array_merge( $timezones, DateTimeZone::listIdentifiers( $region ) );
            }

            $timezone_offsets = array();
            foreach ( $timezones as $timezone ) {
                $tz = new DateTimeZone($timezone);
                $timezone_offsets[$timezone] = $tz->getOffset(new DateTime);
            }

            // sort timezone by offset
            asort($timezone_offsets);

            $timezone_list = array();
            $timezone_list[0] = __( 'Select a Timezone', ALS_Countdown_ID );
            foreach ( $timezone_offsets as $timezone => $offset ) {
                $offset_prefix = $offset < 0 ? '-' : '+';
                $offset_formatted = gmdate( 'H:i', abs($offset) );

                $pretty_offset = "UTC${offset_prefix}${offset_formatted}";

                $timezone_list[$timezone] = "(${pretty_offset}) $timezone";
            }

            return $timezone_list;
            
        }

        /**
         * Front-end display of widget.
         *
         * @see WP_Widget::widget()
         *
         * @param array $args     Widget arguments.
         * @param array $instance Saved values from database.
         */
        public function widget( $args, $instance ) {

            echo $args['before_widget'];
            if ( ! empty( $instance['title'] ) ) {
                echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
            }

            echo $args['after_widget'];

        }

        /**
         * Back-end widget form.
         *
         * @see WP_Widget::form()
         *
         * @param array $instance Previously saved values from database.
         */
        public function form( $instance ) {
            $date = ! empty( $instance['date'] ) ? $instance['date'] : '';
            $time = ! empty( $instance['time'] ) ? $instance['time'] : '';
            $timezone = ! empty( $instance['timezone'] ) ? $instance['timezone'] : 0;

            ?>
            <p>
                <label for="<?php echo $this->get_field_id( 'date' ); ?>"><?php _e( 'Date:', ALS_Countdown_ID ); ?></label> 
                <input class="widefat datepicker" id="<?php echo $this->get_field_id( 'date' ); ?>" name="<?php echo $this->get_field_name( 'date' ); ?>" type="text" value="<?php echo esc_attr( $date ); ?>" />
            </p>
            <p>
                <label for="<?php echo $this->get_field_id( 'time' ); ?>"><?php _e( 'Time:', ALS_Countdown_ID ); ?></label> 
                <input class="widefat clockpicker" id="<?php echo $this->get_field_id( 'time' ); ?>" name="<?php echo $this->get_field_name( 'time' ); ?>" type="text" value="<?php echo esc_attr( $time ); ?>" />
            </p>
            <p>
                <label for="<?php echo $this->get_field_id( 'timezone' ); ?>"><?php _e( 'Timezone:', ALS_Countdown_ID ); ?></label> 
                <select class="widefat" id="<?php echo $this->get_field_id( 'timezone' ); ?>" name="<?php echo $this->get_field_name( 'timezone' ); ?>" type="text">

                    <?php foreach ( $this->generate_timezone_list() as $key => $choice ) : ?>

                    <option value="<?php echo $key; ?>"<?php echo ( $key == esc_attr( $timezone ) ? ' selected' : '' ); ?>><?php echo $choice; ?></option>

                    <?php endforeach; ?>

                </select>
            </p>
            <?php
        }

        /**
         * Sanitize widget form values as they are saved.
         *
         * @see WP_Widget::update()
         *
         * @param array $new_instance Values just sent to be saved.
         * @param array $old_instance Previously saved values from database.
         *
         * @return array Updated safe values to be saved.
         */
        public function update( $new_instance, $old_instance ) {
            $instance = array();
            $instance['date'] = ( ! empty( $new_instance['date'] ) ) ? strip_tags( $new_instance['date'] ) : '';
            $instance['time'] = ( ! empty( $new_instance['time'] ) ) ? strip_tags( $new_instance['time'] ) : '';
            $instance['timezone'] = ( ! empty( $new_instance['timezone'] ) ) ? strip_tags( $new_instance['timezone'] ) : 0;

            return $instance;
        }

    } // class ALS_Countdown_Widget

}