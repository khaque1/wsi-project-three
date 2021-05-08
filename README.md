# National Park Finder
# WSI Project 3 - Beta Release Cycle

Be sure to FORK and CLONE a copy from your GitHub account.

## Team Members
* Emma Prager ([@eprager](https://github.com/eprager/))
* Sneha Rajulapally ([@Sneha](https://github.com/SnehaRajulapally))
* Kinza Haque ([@Kinza](https://github.com/khaque1))
* Alison McDonald ([@Alison](https://github.com/missamcdonald))

## View Deployment: https://nationalparkfinder.herokuapp.com/

## To Run the Project:

* Please ensure you have the necessary dependencies installed (more information below)
* **Before proceeding, please get your own Google Maps API key for free from: https://developers.google.com/maps/gmp-get-started#api-key**
* In your project directory, run `npm start`
* Then, you are prompted to open [http://localhost:3000](http://localhost:3000) in the web browser of your choice

## Dependencies:

### Node and npm:

- **Reference:** <br>
https://nodejs.org/en/
https://www.npmjs.com/get-npm

### Express:

- **Reference:** <br>
https://expressjs.com/

- **Vscode installation:** <br>
``npm install express --save``

- **Update the tests** <br>
All test files are in the test directory

### Mocha:

- **Reference:** <br>
https://mochajs.org/

- **Vscode installation:** <br>
``npm install --global mocha``

- **Run the tests:**
``npm test`` <br>
The test results will be displayed in the command line

- **Update the tests** <br>
All test files are in the test directory

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
Move the jsdoc config file to the root <br>
Navigate the the public/javascripts directory <br>
Run command ``jsdoc ./`` <br>
Update the README with ``jsdoc ./ README.md``

### ESLint:

- **Reference:** <br>
https://eslint.org/

- **Vscode installation:** <br>
``npm install eslint``

- **Setup:** <br>
  - https://eslint.org/docs/user-guide/getting-started
  - https://github.com/karlstolley/eslint-config

- **Run the ESLint:** <br>
Run commands: <br>
``npx eslint -c conf.eslint.json config.js`` <br>
``npx eslint -c (json file) (js file)`` <br>
``map.js --fix``

### Pug

- **Reference:** <br>
https://pugjs.org/api/getting-started.html

- **Vscode installation:** <br>
``npm install pug``

- **Setup:** <br>
All pug files are located in the views directory

### Compression

- **Reference:** <br>
https://www.npmjs.com/package/compression

- **Vscode installation:** <br>
``npm install compression``

### PM2

- **Reference:** <br>
https://pm2.keymetrics.io/docs/usage/quick-start/

- **Vscode installation:** <br>
``npm install pm2@latest -g``

- **Run PM2:**
``pm2 start app.js`` <br>

## Below is the functionality documentation for our Project for each directory:

### config
- **ESLint** files for node and the browser
- **JSDoc** configuration

### docs
- **JSDoc** files

### public
- **javascripts**
  - **search.js** -- JavaScript for functionalities related to filters and list results, as well as placing pins on the map based on those results
  - **map.js** -- JavaScript for functionalities related to initializing the map based on user entered data
- **json** 
  - **NPS API** data (documentation: https://www.nps.gov/subjects/developer/api-documentation.htm#/)
- **stylesheets**
  - **common.css, reset.css** -- Both stylesheets are used within both index and result HTML pages
  - **results.css** -- Styling for only the results HTML page
  - **screen.css** -- Styling for only the index HTML page
  - **map.css** -- Styling for only the map on results HTML page

### routes
- **index.js** - Connects app.js to the index.pug file in views directory
- **results.js** - Connects app.js to the results.pug file in views directory

### test
- **test.js** - runs test script via mocha

### views
- **index.pug** - page for user to enter location and radius utilizing progressive disclosure 
- **results.pug** - page for user to select advanced filters (activities, interests) and view results (map, park information list)
