/** Declare global varible
* @var map
*/
  let map;

/** Function to load asynchronous Google API map results for the National Parks based on the user's geolocation
* or user's input location 
* @function initMap
*/
function initMap() {
  /** Get the latitude value from index page
  *  @var {number} latitude
  */ 
    let latitude = parseFloat(localStorage.getItem("latitude"));
  /** Get the longitude value from index page 
  * @var {number} longitude
  */ 
    let longitude = parseFloat(localStorage.getItem("longitude"));
  /** Get the radius value from index page 
  * @var {number} radius
  */
    let radius = localStorage.getItem("radius");
    //console.log("In maps.js, user input is: ", latitude, longitude, radius);
  /** Place has the latitude and longitude positions of the location
  * @var {string} place
  */ 
    let place = { lat: latitude, lng: longitude};
    //console.log("In maps.js, center of map is: " , place);
  /** Map to view the park results on HTML page with location and zoom
  * @constant map
  * @type {Object}
  * @property {string} center location on map
  * @property {number} zoom zoom map
  */ 
    map = new google.maps.Map(document.getElementById("map"), {
      center: place,
      zoom: 8
    });
  /** Get the icon from the link to represent the location on map: 
  * {@link http://maps.google.com/}
  * @constant iconBase
  * @type {URL}
  */
    const iconBase = "http://maps.google.com/mapfiles/kml/paddle/";
  /** Icon to represent the location on map 
  * @constant marker
  * @type {Object}
  * @property {string} position location on map
  * @property {image} icon icon image
  * @property {Map} map map
  */ 
    const marker = new google.maps.Marker({
      position: place,
      icon: `${ iconBase }blu-stars.png`,
      map: map
    });
  }
  