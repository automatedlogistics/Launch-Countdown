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