# National Park Finder
## WSI Project 3 - Beta Release Cycle

### Below is the application navigation description

### APIs:
**1. Google Maps API**
  - [Get Geolocation](https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap)

**2. National Park Service API**
  - [Get Park information](https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=)
  - [Get Activities](https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=)
  - [Get Interests](https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=)

### Home page:(/index) 
**1. Location:** <br>
  User has two options:
- Input an address/place/zip code etc. (There is a tooltip for help) – Based on what user entered, calculate the latitude and longitude coordinates of the place using geocode logic and pass to mark on map in results page 
- Click on the “get current location” button- Calculate the latitude and longitude coordinates of the place using geocode logic and do a reverse geocode to get the address of the coordinates and display it on the location placeholder.

  **API used:** Google Map API

***Progressive disclosure:*** Radius filter is disclosed only when the user inputs value in the Location placeholder.

![Index](./../../images/index.png)
![Index2](./../../images/index2.png)

**2. Radius:** <br>
Defaulted to <50 miles. Users must select the radius from dropdown with a range from <10 miles to >300 miles.

**3. Search Button:** <br>
User clicks search, which passes location coordinates and radius to results page.

**4. Clear Button:** <br>
User clicks reset, which resets the location and radius place holders.

### Results page:(/results) 
***Advanced Filters:*** <br>
Users can apply the advanced filters (activities / interests) to display more specific results on the map and list.

**API used:** National Park Service API <br>
**1. Activities:** <br>
The checkbox dropdown with activity names are fetched from the NPS website. The JSON data for activities names and ids were pulled using the XMLHttpRequest GET request, and stored in the local file (activities.json). <br>
**API used:** https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=

**2. Interests:** <br>
The checkbox dropdown with interest names are fetched from the NPS website. The JSON data for interest names and ids were pulled using the XMLHttpRequest GET request, and stored in the local file (interests.json). <br>
**API used:** https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=

![Filter](./../../images/filter.png)

***Results:*** <br>
**APIs used:**  Google Map API, National Park Service API

![Filter](./../../images/results.png)

**3. Map:** <br>
The location coordinates from the index page are passed to the map on the results page, which marks the location of the user in the map (Blue star marker).  The park locations corresponding to the search results appear using the pink markers, and adjust as filters are applied. <br>
**APIs used:**  Google Map API, National Park Service API

![Filter](./../../images/results-map.png)

**4. List Results:** <br>
Park information such as park name, park description, park location and park distance from user's location are displayed based on the user's inputted location and radius on the index page. The JSON data for park name, individual park links, park description, and state location, were pulled using the XMLHttpRequest GET request. <br>
**API used:** https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=

![Filter](./../../images/results-list.png)

Advanced filter options (activities and interests) are applied to get more specific search results, reflected in the map and the list.

![Filter2](./../../images/filter2.png)
