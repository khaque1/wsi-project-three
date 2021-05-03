// Before proceeding please get your own Google maps API KEY for free by referring 
// the api documentation: https://developers.google.com/maps/documentation/javascript/get-api-key

let maps_url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAupsqitkeU66afXbypqbGtkxwKqOlfovs&callback=initMap&libraries=&v=weekly';

window.addEventListener('load', (event) => {
  //console.log('page is fully loaded');
  var apiScript = document.createElement(tagName='script');
  apiScript.src = maps_url;
  apiScript.setAttribute('async','');
  apiScript.setAttribute('defer','');
  window.document.body.appendChild(apiScript);
});