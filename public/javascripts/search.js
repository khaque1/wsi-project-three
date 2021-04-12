// Function to calculate current position  
// @function getLocation
function getLocation() {
  if (navigator.geolocation) {
  /** Call show position function to get the coordinates */
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

// Function to get the latitude and longitude positions  
// @function showPosition
// @param {String} position position on the map
function showPosition(position) {
  // Get latitude coordinate 
  // @var {number} lat
  let lat = position.coords.latitude;   
  // Get longitude coordinate 
  // @var {number} long
  let long = position.coords.longitude;
  // Combine both latitude and longutide 
  // @var {String} location
  let location = `${ lat },${ long }`;
  console.log(location); 
}

// Function to calculate current geo location of the user
// @function current_location
function current_location(){
  // Call show position function to get the coordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  function showPosition(position) {
    // Get latitude coordinate
    let lat = position.coords.latitude;
    // Get longitude coordinate
    let long = position.coords.longitude;
    // Combine both latitude and longutide
    let location = `${ lat },${ long }`;
    console.log(location); 
    // Call get address function to calculate address based on latitude and longitude coordinates
    getAddress(lat, long);
    /**  
      * Function to get adress from the latitude and longitude coordinates 
      * @function getAddress
      * @param {String} latitude latitude coordinate
      * @param {String} longitude longitude coordinate
      */  
    function getAddress(myLatitude, myLongitude) {
      // Create a geocoder object from Google maps API: 
      // {@link https://maps.googleapis.com/maps/api/js}
      // @var {object} geocoder
      let geocoder	= new google.maps.Geocoder();	
      // Create a location object for latitude and longitude coordinates from Google Maps API:
      // {@link https://maps.googleapis.com/maps/api/js}
      // @var {object} location
      // @param {String} latitude latitude coordinate
      // @param {String} longitude longitude coordinate
      let location	= new google.maps.LatLng(myLatitude, myLongitude);
      // Turn coordinates into an object
      geocoder.geocode({'latLng': location}, function (results, status) {
        // If geocode is successful, pass the address to the location placeholder
        if(status == google.maps.GeocoderStatus.OK) {					
          document.getElementById("loc").value= results[0].formatted_address;					
        } 
      });
    }
  }
}

// Function to calculate geo location that shows latitude and longitude positions of the based on user input for location
// @function search
function search(){
  if(document.getElementById("loc").value.length == 0) {
    //getLocation();
    alert("Please fill out the required field to proceed further!");
    document.getElementById("loc").focus();
  } else {
    let geocoder = new google.maps.Geocoder();
    let address= document.getElementById("loc").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // Get latitude coordinate
        let lat = results[0].geometry.location.lat();
        // Get longitude coordinate
        let long= results[0].geometry.location.lng();
        // Combine both latitude and longitude
        let location = `${ lat },${ long }`;
        console.log(location); 
        // Get radius value input given by user
        let radius=document.getElementById("rad").value;
        console.log(radius);
        // Pass location details to results page to generate map and list results
        localStorage.setItem("latitude", lat);
        localStorage.setItem("longitude", long);
        localStorage.setItem("radius", radius);
        // Call results.html page on click of search
        window.location.href = "../public/results.html";
      }
    });
  }
}

let expanded = false;

// Function to exapnd the checbox dropdown for activities filter
// @function showCheckboxes1
function showCheckboxes1() {
  let checkboxes = document.getElementById("checkboxes1");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

// Function to exapnd the checbox dropdown for interests filter
// @function showCheckboxes2
function showCheckboxes2() {
  let checkboxes = document.getElementById("checkboxes2");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

// Function to reset the inputs of filter parameters
// @function reset
function reset() {
  document.getElementById("filter").reset();
}


// Function to pull in the activity names from the NPS API and display them as options in the drop down list
fetch( `https://developer.nps.gov/api/v1/activities?&api_key=${ nps_token }` )
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Status code:' + response.status);
        return;
      }
      
      // Get activity data from NPS API
      response.json().then(function(data) {
        console.log(data);
        
        let res = data;
        let list = (res.data).length;
        for (let i = 0; i < list; i++) {
          let counter = res.data[i].name; // Get activity name from NPS API
          id = res.data[i].id; // Get activity id from NPS API

          // Display activity names in dropdown as checkboxes
          if (document.getElementById("checkboxes1")) {
            document.getElementById("checkboxes1").innerHTML +=   
            `<input type='checkbox' id='${ id }' value = '${ counter }'/> ${ counter } <br />`;
          }
        }
      });
    }
  )
  .catch(function(err) {
    console.log(err);
  });
 
 

// Function to get the checked checkbox values for activities
// @function activities_checkbox 
function activities_checkbox() {
  let activities = document.getElementById("checkboxes1").querySelectorAll('input[type="checkbox"]:checked');
  let i=0;
  let activity_name;
  let activity_id;
  for (let checkbox1 of activities) {
    if (checkbox1.checked) {
      i+= 1;
    }
    activity_id = checkbox1.id;   
    activity_name = checkbox1.value;
    activitiesFilter(activity_id); // Pass the selected activity id to the activitiesFilter function
  }
  if(i>0){
    document.getElementById("selection1").textContent = `${ i } selected`; // Display selected number
  }else{
    document.getElementById("selection1").textContent = "Select Activities"; // Display original text if nothing is checked
  }
}

// Function to pull in the interests names from the NPS API and display them as options in the drop down list
fetch( `https://developer.nps.gov/api/v1/topics?limit=83&api_key=${ nps_token }` )
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Status code:' + response.status);
        return;
      }
      
      // Get interest data from NPS API
      response.json().then(function(data) {
        console.log(data);
        
        let res = data;
        let list = (res.data).length;
        for (let i = 0; i < list; i++) {
          let counter = res.data[i].name; /** Get interests name from NPS API */
          id = res.data[i].id; /** Get interests id from NPS API */
          
          // console.log(counter);
          // console.log(id); 
          
          if (document.getElementById("checkboxes2")) {
          /** Display interests names in dropdown as checkboxes*/
            document.getElementById("checkboxes2").innerHTML += 
                    `<input type='checkbox' id='${ id }' value = '${ counter }'/> ${ counter } <br />`;
          }
        }
      });
    }
  )
  .catch(function(err) {
    console.log(err);
  });


// Function to get the checked checkbox values for interests 
// @function interests_checkbox 
function interests_checkbox() {
  let interests = document.getElementById("checkboxes2").querySelectorAll('input[type="checkbox"]:checked');
  let j=0;
  let interests_name;
  let interests_id;
  for (let checkbox2 of interests) {
    if (checkbox2.checked){
      j+= 1;
      interests_id = checkbox2.id;
      interests_name = checkbox2.value;
      interestFilter(interests_id); // Pass the selected interest id to the interestFilter function
    }
  }
  if(j>0){
    document.getElementById("selection2").textContent = `${ j } selected`; /** Display selected number*/ 
  }else{
    document.getElementById("selection2").textContent = "Select Interests"; /** Display original text if nothing is checked*/ 
  }
}


// Function to create an activities filter. If the checkbox(es) for activities are selected, then display the park results with those attributes.
// @function activitiesFilter
// @param {String} activity_id Activity id 
function activitiesFilter(activity_id) {
  fetch( `https://developer.nps.gov/api/v1/parks?limit=466&api_key=${ nps_token }` )
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Status code:' + response.status);
          return;
        }
        
          /** Get ParkInformation such as park name, park description and park links from NPS API */ 
        response.json().then(function(data) {
          console.log(data);
          
          let res = data;
          let list = (res.data).length;
          if(document.getElementById("text")){
            document.getElementById("text").innerHTML = "";
          }
          for (let i = 0; i < list; i++) {
            let fullName = res.data[i].fullName; /** Get Parkname*/ 
            let id = res.data[i].id; /** Get Parkid*/ 
            let description = res.data[i].description; /** Get Parkdescription*/ 
            let parkLink = res.data[i].url; /** Get Park url that redirects to NPS website*/ 
            let latitude = res.data[i].latitude; /** Get Park latitude coordinate*/
            let longitude = res.data[i].longitude; /** Get Park longitude coordinate*/
            let state = res.data[i].states; /** Get Park location - state*/
        
            /** Filter #1 - If certain activities are selected, only display the results that have that attribute. */ 
            let activitiesList = res.data[i].activities.length; /** Get activities list for each state park*/ 
            for (let j = 0; j < activitiesList; j++) {
              let activityId = res.data[i].activities[j].id; /** Get activities id for each state park*/ 
              if (document.getElementById("checkboxes1")){
                let activitiesCheckbox = document.getElementById("checkboxes1").querySelectorAll('input[type="checkbox"]:checked');
                for (let checkbox1 of activitiesCheckbox) {
                  if ((checkbox1.checked) && (activityId === activity_id)) {
                    if(document.getElementById("text")){
                    /** Display list results that shows park information with corresponding activity ID*/ 
                      document.getElementById("text").innerHTML += 
                                `<br><p id= 'parkname'> <a href='${ parkLink }'> <b>${ fullName }</b> </a></p>` + 
                                `<p id= 'parkdescription'> ${ description }</p>`
                                + `<p id= 'parklocation'><b> State: </b>${ state }</p>`;
                    }
                    
                  }
                }     
              }            
            }
          } 

        });
      }
    )
    .catch(function(err) {
      console.log(err);
    });
}
activitiesFilter();


// Function to create an Interest filter. If the checkbox(es) for Interests are selected, then display the park results with those attributes.
// @function interestFilter
// @param {String} interests_id Interests id 
function interestFilter(interests_id) {
  fetch( `https://developer.nps.gov/api/v1/parks?limit=466&api_key=${ nps_token }` )
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Status code:' + response.status);
          return;
        }
        
        /** Get ParkInformation such as park name, park description and park links from NPS API */ 
        response.json().then(function(data) {
          console.log(data);
          
          let res = data;
          let list = (res.data).length;
          if(document.getElementById("text")){
            document.getElementById("text").innerHTML = "";
          }
          for (let i = 0; i < list; i++) {
            let fullName = res.data[i].fullName; /** Get Parkname*/ 
            let id = res.data[i].id; /** Get Parkid*/ 
            let description = res.data[i].description; /** Get Parkdescription*/ 
            let parkLink = res.data[i].url; /** Get Park url that redirects to NPS website*/ 
            let latitude = res.data[i].latitude; /** Get Park latitude coordinate*/
            let longitude = res.data[i].longitude; /** Get Park longitude coordinate*/
            let state = res.data[i].states; /** Get Park location - state*/
        
            /** Filter #2 - If certain interests are selected, only display the results that have that attribute. */ 
            let interestsList = res.data[i].topics.length; /** Get topics/interests list for each state park*/ 
            for (let j = 0; j < interestsList; j++) {
              let interestId = res.data[i].topics[j].id; /** Get topics/interests id for each state park*/ 
              if (document.getElementById("checkboxes2")){ 
                let interestsCheckbox = document.getElementById("checkboxes2").querySelectorAll('input[type="checkbox"]:checked');
                for (let checkbox2 of interestsCheckbox) {
                  if ((checkbox2.checked) && (interestId === interests_id)) {
                  /** Display list results that shows park information with corresponding interest ID*/ 
                    if (document.getElementById("text")){ 
                      document.getElementById("text").innerHTML += 
                                `<br><p id= 'parkname'> <a href='${ parkLink }'> <b>${ fullName }</b> </a></p>` + 
                                `<p id= 'parkdescription'> ${ description }</p>`
                                + `<p id= 'parklocation'><b> State: </b>${ state }</p>`;
                    }
                  }
                }      
              }           
            }
          }

        });
      }
    )
    .catch(function(err) {
      console.log(err);
    });
}
interestFilter();


// Function to pull in the Park results from NPS website and show as list results with radius filter
// @function parks
// @param {Number} lat Latitude
// @param {Number} long Longitude
// @param {Number} radius Radius 
function parks(lat, long, radius) {
  /** Get ParkInformation such as park name, park description and park links from NPS API */ 
  fetch( `https://developer.nps.gov/api/v1/parks?limit=466&api_key=${ nps_token }` )
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Status code:' + response.status);
          return;
        }
        
        /** Get ParkInformation such as park name, park description and park links from NPS API */ 
        response.json().then(function(data) {
          console.log(data);
          
          let res = data;
          let list = (res.data).length;
          if(document.getElementById("text")){
            document.getElementById("text").innerHTML = "";
          }
          for (let i = 0; i < list; i++) {
            let fullName = res.data[i].fullName; /** Get Parkname*/ 
            let id = res.data[i].id; /** Get Parkid*/ 
            let description = res.data[i].description; /** Get Parkdescription*/ 
            let parkLink = res.data[i].url; /** Get Park url that redirects to NPS website*/ 
            let latitude = res.data[i].latitude; /** Get Park latitude coordinate*/
            let longitude = res.data[i].longitude; /** Get Park longitude coordinate*/
            let state = res.data[i].states; /** Get Park location - state*/

          // compare lat and long with radius
          let distanceBetween = distance(latitude, longitude, lat, long);
          if(distanceBetween<=radius){
             if (document.getElementById("text")){ 
             /** Display list results that shows park informationID*/ 
             document.getElementById("text").innerHTML += 
                      `<br><p id= 'parkname'> <a href='${ parkLink }'> <b>${ fullName }</b> </a></p>` + 
                      `<p id= 'parkdescription'> ${ description }</p>`
                      + `<p id= 'parklocation'><b> State: </b>${ state }</p>`
                      + `<p id= 'distance'><b> Distance away in miles: </b>${ Math.round(distanceBetween) }</p>`;
             }
          }
        } 
      });
    }
  )
  .catch(function(err) {
    console.log(err);
  });
}

parks(localStorage.getItem("latitude"), localStorage.getItem("longitude"), localStorage.getItem("radius"));


// Function to calculate the distance based on radius entered
// @function distance
// @param {Number} lat1 Park latitude coordinate
// @param {Number} lng1 Park longitude coordinate
// @param {Number} lat2 User latitude coordinate
// @param {Number} lng2 User longitude coordinate
function distance(lat1, lng1, lat2, lng2) {
  function deg2rad(deg){
    return deg * (Math.PI/180);
  }
  function square(x){
    return Math.pow(x, 2);
  }
  let r=6371; // radius of the earth in km
  lat1=deg2rad(lat1);
  lat2=deg2rad(lat2);
  let lat_dif=lat2-lat1;
  let lng_dif=deg2rad(lng2-lng1);
  let a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
  let d=2*r*Math.asin(Math.sqrt(a));
  let result = d * 0.621371; // calculate miles
  return result;
}

window.addEventListener("load", setFunctions, false);

// Function to call the event listeners from both the html pages
// @function setFunctions
function setFunctions() {
  if(document.getElementById("currlocation")){
    document.getElementById("currlocation").addEventListener("click",current_location, false);
  }
  if(document.getElementById("search")){
    document.getElementById("search").addEventListener("click", search, false);
  }
  if(document.getElementById("reset")){
    document.getElementById("reset").addEventListener("click", reset, false);
  }
  if(document.getElementById("activ")){
  document.getElementById("activ").addEventListener("click", showCheckboxes1, false);
  }
  if(document.getElementById("intr")){
  document.getElementById("intr").addEventListener("click", showCheckboxes2, false);
  }
  
  if(document.getElementById("checkboxes1")){
  document.getElementById("checkboxes1").addEventListener('change', activities_checkbox, false);
  }

  if(document.getElementById("checkboxes2")){
  document.getElementById("checkboxes2").addEventListener('change', interests_checkbox, false);
  }

}
