jQuery( document ).ready( function( $ ) {

    function createDatepicker() {

        var found = $( 'div[id*="als_countdown_widget"] .datepicker' ).not( '*[id*="__i__"]' ); // Exclude the template

        found.each( function( index, element ) {

            $( element ).not( '*[id*="__i__"]' ).on( 'click', function() { // Go figure, twelvehour clock is pretty broken. No wonder it isn't in the Docs~

                $( element ).pickadate( {
                    format: 'mm/dd/yyyy',
                } );

            } );

        } );

    }

    createDatepicker();

    // We have to check for our Clockpicker each time a widget is created. Isn't that fun? /s
    $( document ).ajaxStop( function() {
        createDatepicker();
    } );

} );