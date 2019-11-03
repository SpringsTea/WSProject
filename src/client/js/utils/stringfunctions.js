export const Capitalize = (lower) => lower.toLowerCase().replace(/^\w/, c => c.toUpperCase());
export const FormatDateString = (datestring, params) => {
	//https://coderwall.com/p/aa4r6a/javascript-date-format-vanilla
    var options = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
    };

    if( params ) {
        options = Object.assign( options, params );
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    return new Date( datestring ).toLocaleString( 'en-US', options );
}