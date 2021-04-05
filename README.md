# WSI Project 3

Be sure to FORK and CLONE a copy from GitHub account.

## Team Members
* Emma Prager ([@eprager](https://github.com/eprager/))
* Sneha Rajulapally ([@Sneha](https://github.com/SnehaRajulapally))
* Kinza Haque ([@Kinza](https://github.com/khaque1))
* Alison McDonald ([@Alison](https://github.com/missamcdonald))

## To Run the Project:

* Please ensure you have the necessary dependencies installed
* In your project directory, run `node index.js`
* Then, you are prompted to open [http://localhost:3000](http://localhost:3000) in the web browser of your choice

# National Park Finder

Below is the functionality documentation for our Project that includes commands to run JSDocs and ESLint

### HTML: 
- **index.html** -- HTML page for location and radius filters utilizing progressive disclosure 
- **results.html** -- HTML page for advanced filters (activities, interests) and results (map, park information list).

### CSS: 
- **common.css, reset.css** -- Both stylesheets are used within both index and result HTML pages
- **results.css** -- Styling for only the results HTML page
- **screen.css** -- Styling for only the index HTML page

### JavaScript:
- **search.js** -- JavaScript for functionalities related to filters and list results
- **map.js** -- JavaScript for functionalities related to map (locate user’s current location or input location) and parks

### APIs:
**1. Google Maps API**
  - [Get Geolocation](https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap)

**2. National Park Service API**
  - [Get Park information](https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=)
  - [Get Activities](https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=)
  - [Get Interests](https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=)

### Home page:(index.html) 
**1. Location:** <br>
  User has two options:
- Input an address/place/zip code etc. (There is a tooltip for help) – Based on what user entered, calculate the latitude and longitude coordinates of the place using geocode logic and pass to mark on map in results page 
- Click on the “get current location” button- Calculate the latitude and longitude coordinates of the place using geocode logic and do a reverse geocode to get the address of the coordinates and display it on the location placeholder.

  **API used:** Google Map API

***Progressive disclosure:*** Radius filter is disclosed only when the user inputs value in the Location placeholder.

**2. Radius:** <br>
Defaulted to <50 miles. Users must select the radius from dropdown with a range from <10 miles to >300 miles.

**3. Search Button:** <br>
Pass location coordinates and radius to results page.

**4. Clear Button:** <br>
Resets the location and radius place holders.

![image](https://user-images.githubusercontent.com/46754241/112546397-60db0580-8d87-11eb-9c8b-ab0b897f37ec.png)

### Results page:(results.html) 
***Advanced Filters:*** <br>
Users can use the advanced filters- activities and interests to display more specific map and list results.

![image](https://user-images.githubusercontent.com/46754241/112555467-3e9cb400-8d96-11eb-947d-9a09ca50f86a.png)

**API used:** National Park Service API <br>
**1. Activities:** <br>
Checkbox dropdown with activity names fetched from NPS website. The JSON data for activities names and ids were pulled using the XMLHttpRequest GET request. <br>
**API used:** https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=

![image](https://user-images.githubusercontent.com/46754241/112546784-e52d8880-8d87-11eb-886f-227a2a78336e.png)

**2. Interests:** <br>
Checkbox dropdown with interests’ names fetched from NPS website. The JSON data for interest names and ids were pulled using the XMLHttpRequest GET request. <br>
**API used:** https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=

![image](https://user-images.githubusercontent.com/46754241/112546826-f8d8ef00-8d87-11eb-8b7a-4f77bc426ad3.png)

***Results:*** <br>
**APIs' used:**  Google Map API, National Park Service API

**3. Map:** <br>
The location coordinates from the index page are passed to the map on the results page, which marks the location of the user in the map (Blue star marker). <br>
**API used:** https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap

![image](https://user-images.githubusercontent.com/46754241/112555425-29278a00-8d96-11eb-8b74-22702747050b.png)

**4. List Results:** <br>
Park information such as park name, park description, park location and park distance from user's location are displayed based on the user's location and radius from the index page. The JSON data for park name, individual park links, park description, and state location, were pulled using the XMLHttpRequest GET request. <br>
**API used:** https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=

![image](https://user-images.githubusercontent.com/46754241/112555684-a94def80-8d96-11eb-892c-545330d40633.png)

Advanced filter options (activities and interests) are used to get more specific results.

![image](https://user-images.githubusercontent.com/46754241/112547179-68e77500-8d88-11eb-9b7f-6ea841964404.png)

### JSDocs:

- **Reference:** <br>
https://jsdoc.app/

- **Vscode installation:** <br>
``npm install -g jsdoc``

- **Configuring JSDoc with configuration file:** <br>
https://jsdoc.app/about-configuring-jsdoc.html

- **Run the JSDocs:**
``npm run docs`` <br>
Run the command ``http-server`` from the out directory, and you can visit http://localhost:8080 to view your documentation page.

- **Update the JSdoc:** <br>
Run command ``jsdocs ./``

### ESLint:

- **Reference:** <br>
https://eslint.org/

- **Vscode installation:** <br>
``npm install eslint``

- **Setup:** <br>
1. https://eslint.org/docs/user-guide/getting-started
2. https://github.com/karlstolley/eslint-config

- **Run the ESLint:** <br>
Run commands: <br>
``npx eslint -c conf.eslint.json config.js`` <br>
``npx eslint -c (json file) (js file)`` <br>
``map.js --fix``
