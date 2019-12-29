var fillPdf = require("fill-pdf");
var path = require("path");
let sourcePDF = path.resolve('../public/pdfs/BSNA.pdf');

var FormData = { deckname: 'FuckShit' };

fillPdf.generatePdf(FormData, sourcePDF, function(err, output) {
	if ( !err ) {
		console.log('You did it')
	}
	console.log(err)
});