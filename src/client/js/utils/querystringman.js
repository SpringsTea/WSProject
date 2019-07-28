import queryString from 'query-string'

//@ params obj {}
export default function(params){
	if (history.pushState) {

		var qs = queryString.stringify(params);

		var newurl = window.location.origin + window.location.pathname + `${qs ? '?' : ''}${qs}`;
		window.history.replaceState({path:newurl},'',newurl);
  	} 
  	else{
  		console.log('Some ancient browser that dosnt support history.replaceState');
  	}
}

