var launchFireworks = false,
    SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mousePos = {
        x: 400,
        y: 300
    },

    // create canvas
    canvas = document.createElement( 'canvas' ),
    context = canvas.getContext( '2d' ),
    particles = [],
    rockets = [],
    MAX_PARTICLES = 400,
    colorCode = 0;

canvas.setAttribute( 'id', 'fireworks-display' );
document.body.appendChild( canvas );

var fireworksLoad = function() {

    launchFireworks = true;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    setInterval( launch, 800 );
    setInterval( loop, 1000 / 50 );

}

var fireworksEasterEgg = new Konami();
fireworksEasterEgg.code = fireworksLoad;

// Load Fireworks at anytime if the Konami Code is entered
// Nice for debugging as well as a nice easter egg if this ends up staying enabled
fireworksEasterEgg.load();

jQuery( function( $ ) {

    var countdownOverlay = document.getElementById( 'countdown-overlay' );
    
    if ( countdownOverlay !== null ) {
    
        var transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
            support = { transitions : Modernizr.csstransitions },
            countdownSVG = Snap( countdownOverlay.querySelector( 'svg' ) ),
            countdownPath = countdownSVG.select( 'path' ),
            countdownPathConfig = {
                from : countdownPath.attr( 'd' ),
                to : countdownOverlay.getAttribute( 'data-path-to' )
            };
        
    }
    
    function toggleCountdownOverlay() {

        if ( $( countdownOverlay ).hasClass( 'open' ) ) {
            $( countdownOverlay ).removeClass( 'open' );
            $( countdownOverlay ).addClass( 'close' );

            var onEndTransitionFn = function( event ) {
                $( countdownOverlay ).hasClass( 'close' );
            };

            countdownPath.animate( { 'path' : countdownPathConfig.from }, 400, mina.linear, onEndTransitionFn );
        }
        else {
            setTimeout( function() {
                $( countdownOverlay ).addClass( 'open' );
                $( '#countdown-overlay-previous' ).css( 'visibility', 'hidden' );
            }, 0 ); // Take that, single-threaded JavaScript
            $( countdownOverlay ).removeClass( 'close' );
            countdownPath.animate( { 'path' : countdownPathConfig.to }, 0, mina.linear );
            
            $( countdownOverlay ).find( '.countdown-field' ).focus();
        }

    }

    $( document ).ready( function() {

        if ( $( '.countdown-container' ).length > 0 ) {

            var date = $( '.countdown-container' ).data( 'date' ),
                time = $( '.countdown-container' ).data( 'time' ),
                targetTimezone = $( '.countdown-container' ).data( 'timezone' );

            var hours,
                minutes;

            if ( time.toLowerCase().indexOf( 'pm' ) !== -1 ) {

                time = time.replace( /pm/i, '' ).trim().split( ':' );

                hours = parseInt( time[0] );
                minutes = parseInt( time[1] );

                if ( hours !== 12 ) {

                    hours = hours + 12;

                }

            }
            else {

                time = time.replace( /am/i, '' ).trim().split( ':' );

                hours = parseInt( time[0] );
                minutes = parseInt( time[1] );

            }

            date = date.split( '/' );

            var month = parseInt( date[0] ) - 1, // JavaScript date 0 indexes the month
                day = parseInt( date[1] ),
                year = parseInt( date[2] );

            var offsetTimes = getTimezoneAdjustedDateTime( year, month, day, hours, minutes, targetTimezone );
            
            var fireworksEnd = new Date( Date.UTC( offsetTimes.year, offsetTimes.month, offsetTimes.day, offsetTimes.hours, offsetTimes.minutes + 5, 0 ) ).getTime() / 1000;
            
            var now = new Date().getTime() / 1000;
            
            if ( ( fireworksEnd - now ) <= 0 ) {
                $( '#countdown-overlay-previous' ).css( 'visibility', 'hidden' );
            }

            var countdown = new Countdown( {
                selector: '.countdown',
                leadingZeros: true,
                msgAfter: '',
                msgPattern: "{days}:{hours}:{minutes}:{seconds}",
                dateEnd: new Date( Date.UTC( offsetTimes.year, offsetTimes.month, offsetTimes.day, offsetTimes.hours, offsetTimes.minutes, 0 ) ),
            } );
            
            var fireworksDuration = new Countdown( {
                selector: '.fireworks-countdown',
                leadingZeros: true,
                msgBefore: '',
                msgAfter: '',
                msgPattern: '',
                dateStart: new Date( Date.UTC( offsetTimes.year, offsetTimes.month, offsetTimes.day, offsetTimes.hours, offsetTimes.minutes, 0 ) ),
                dateEnd: new Date( Date.UTC( offsetTimes.year, offsetTimes.month, offsetTimes.day, offsetTimes.hours, offsetTimes.minutes + 5, 0 ) ),
            } );

            $( '.countdown-container .countdown' ).on( 'countdownStart', function() {
                toggleCountdownOverlay();
            } );
            
            $( '.countdown-container .countdown' ).on( 'countdownEnd', function() {
                toggleCountdownOverlay();
            } );
            
            $( '.countdown-container .fireworks-countdown' ).on( 'countdownStart', function() {
                $( '#countdown-overlay-previous' ).css( 'visibility', 'hidden' );
                fireworksLoad();
            } );
            
            $( '.countdown-container .fireworks-countdown' ).on( 'countdownEnd', function() {
                $( '#fireworks-display' ).remove();
            } );

        }

    } );

    // update mouse position, used for some rocket calculation
    $( document ).mousemove( function( e ) {

        if ( launchFireworks ) {
            e.preventDefault();
            mousePos = {
                x: e.clientX,
                y: e.clientY
            };    
        }

    } );

    // launch more rockets!!! 
    $( document ).mousedown( function( e ) {

        if ( launchFireworks ) {
            for ( var i = 0; i < 5; i++ ) {
                launchFrom( Math.random() * SCREEN_WIDTH * 2 / 3 + SCREEN_WIDTH / 6 );
            }
        }

    } );

} );