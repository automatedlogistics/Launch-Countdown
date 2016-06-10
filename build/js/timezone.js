function getTimezoneAdjustedDateTime( year, month, day, hours, minutes, targetTimezone ) {

    // If the visitor is a different timezone than the stored one, we need to do some math
    var currentTimezone = moment.tz.guess(),
        currentTimezoneOffset = moment.tz.zone( currentTimezone ).parse( Date.UTC( year, month, day, hours, minutes ) ) / 60;

    var targetTimezoneMoment = moment.tz.zone( targetTimezone ),
        targetTimezoneOffset = targetTimezoneMoment.parse( Date.UTC( year, month, day, hours, minutes ) ) / 60;

    //var timezoneOffset = currentTimezoneOffset + targetTimezoneOffset;
    timezoneOffset = targetTimezoneOffset;

    // This gets pretty nasty
    timezoneOffset = timezoneOffset.toString().split( '.' );

    if ( ( Array.isArray( timezoneOffset ) ) && ( timezoneOffset.length > 1 ) ) {

        console.error( 'Weird Timezones with partial hour offsets to UTC don\'t work currently.' );

        timezoneOffset[0] = parseInt( timezoneOffset[0] );
        timezoneOffset[1] = ( parseFloat( timezoneOffset[1] ) / 100 ) * 60;

        if ( timezoneOffset[0] > 0 ) {
            hours = hours + timezoneOffset[0];
            minutes = minutes + timezoneOffset[1];
        }
        else {
            hours = hours - timezoneOffset[0];
            minutes = minutes - timezoneOffset[1];
        } 

    }
    else {
        hours = hours + parseInt( timezoneOffset[0] );
    }

    if ( hours > 23 ) {

        var extraDays = hours / 24;

        day = day + parseInt( extraDays );
        hours = hours - ( 24 * parseInt( extraDays ) );

    }

    if ( minutes < 0 ) {

        minutes = 60 + minutes; // Negative value will actually be subtracted
        hours = hours - 1;

    }

    if ( minutes >= 60 ) {

        minutes = minutes - 60;
        hours = hours + 1;

    }
    
    return {
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes,
    };
    
}