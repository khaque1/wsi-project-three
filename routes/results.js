var express = require("express");
var router = express.Router();
const path = require("path");
const NodeGeocoder = require('node-geocoder');
const fsPromises = require("fs").promises;
router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));

router.get("/", async (req, res, next) => {
  console.log('GET RESULTS');
  console.log(req.url);
  console.log(req.query);
  var loc = req.query.location; 
  var radius = req.query.radius; 
  const options = {
    provider: 'google',
    apiKey: process.env.MAP_KEY, // google map API key
    formatter: null 
  };
  const geocoder = NodeGeocoder(options);
  const callResponse = await geocoder.geocode(loc);
  const [ result ]= callResponse;
  const { longitude, latitude } = result;
  const parkList = await parksLocation(latitude, longitude, radius);
  res.render("results", { parkList }); 
  });

router.post("/", async (req, res, next) => {
  console.log('POST RESULTS');
});
  
async function parksLocation(lat, long, radius) {
  try {
    const parksList = await fsPromises.readFile(
      path.resolve(__dirname, "../data/json/parks.json"),
      "utf-8"
    );

    let res = JSON.parse(parksList);
    let list = res.data.length;
    let locations = new Array();
    for (let i = 0; i < list; i++) {
      let fullName = res.data[i].fullName; /** Get Parkname*/
      let id = res.data[i].id; /** Get Parkid*/
      let description = res.data[i].description; /** Get Parkdescription*/
      let parkLink =
        res.data[i].url; /** Get Park url that redirects to NPS website*/
      let latitude = res.data[i].latitude; /** Get Park latitude coordinate*/
      let longitude = res.data[i].longitude; /** Get Park longitude coordinate*/
      let state = res.data[i].states; /** Get Park location - state*/
      
      // compare lat and long with radius
      let distanceBetween = distance(latitude, longitude, lat, long);
      if (distanceBetween <= radius) {
        locations.push({
          id,
          fullName,
          description,
          state,
          parkLink,
          distance: Math.round(distanceBetween),
          lat: latitude,
          lng: longitude,
        });
      }
    }
    return locations;
  } catch (error) {
    //console.error(error);
    return `<h1>Internal Server Error : 500</h1>`;
  }
}

function distance(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  function square(x) {
    return Math.pow(x, 2);
  }
  let r = 6371; // radius of the earth in km
  lat1 = deg2rad(lat1);
  lat2 = deg2rad(lat2);
  let lat_dif = lat2 - lat1;
  let lng_dif = deg2rad(lng2 - lng1);
  let a =
    square(Math.sin(lat_dif / 2)) +
    Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
  let d = 2 * r * Math.asin(Math.sqrt(a));
  let result = d * 0.621371; // calculate miles
  return result;
}

module.exports = router;
