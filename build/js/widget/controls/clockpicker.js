jQuery( document ).ready( function( $ ) {
    
    function clockpickerAmPM( value ) {
        
        // Needs a slight delay to ensure the DOM is available
        setTimeout( function() {
        
            if ( value.toLowerCase().indexOf( 'pm' ) !== -1 ) {
                $( '.pm-button' ).click();
            }
            else {
                $( '.am-button' ).click();
            }
            
        }, 100 );
        
    }

    function createClockpicker() {
        
        var found = $( 'div[id*="als_countdown_widget"] .clockpicker' ).not( '*[id*="__i__"]' ); // Exclude the template
        
        found.each( function( index, element ) {

            $( element ).not( '*[id*="__i__"]' ).on( 'click', function() { // Go figure, twelvehour clock is pretty broken. No wonder it isn't in the Docs~

                $( this ).clockpicker( {    
                    donetext: 'Set Time',
                    autoclose: true,
                    twelvehour: true,
                    afterShow: clockpickerAmPM( $( this ).val() ),
                } );

                $( this ).clockpicker( 'show' );

            } );
            
        } );
        
    }

    createClockpicker();

    // We have to check for our Clockpicker each time a widget is created. Isn't that fun? /s
    $( document ).ajaxStop( function() {
        createClockpicker();
    } );

} );