# WSI Project Two: Web System Alpha-Release Cycle
### for goodness SAKE
###### Spring 2021

## Problem
On the National Park Service (NPS) website, there are 2 different pages to search for National Parks.  But there is no tool to geographically plan a trip.

For example, the main search page, [Find a Park](https://www.nps.gov/findapark/index.htm), uses a US map that is not geographically correct and is bounded by state lines.  Even if a user would like to explore an area that encompasses a variety of states, they cannot select multiple states at once.

![Find a Park](https://user-images.githubusercontent.com/46731977/106190244-5fba9d00-6177-11eb-84e9-4f5e5d5db2ff.png)

Similarly, on the advanced search page, [Find a Park | Advanced Search](https://www.nps.gov/findapark/advanced-search.htm), only one state can be selected from the state dropdown.  There are additional features (search by Activity and Topic), but the “Find a Park” dropdown is too prominent on the page, taking up too much valuable space on the top section of the page.

![Find a Park | Advanced Search](https://user-images.githubusercontent.com/46731977/106190528-ca6bd880-6177-11eb-9d03-b7285463652b.png)

## Solution
To provide NPS visitors with an enhanced trip planning feature, this system will allow users to geographically search for national parks in their area.  By inputting an address or GPS coordinates, as well as a radius in miles, a search will be conducted for all national parks in the area.  To include features on the existing advanced search page, users will still be able to filter by Activities and Topics.

The results could be displayed in two locations: on a map with location pins that would direct users to read more about that specific park in the list of results.

![Design](https://user-images.githubusercontent.com/46731977/106816723-c8a48800-6643-11eb-94f0-a35bdfa69a93.png)

To achieve this, the [NPS API](
https://www.nps.gov/subjects/developer/api-documentation.htm#/activities/parks) would be utilized.  Primarily GET parks, activities, activities/parks, topics, topics/parks.

GET parks has a "latLong" component, which will be used as the location of the park.  When a user enters a location and a radius, these GPS coordinates will be used to determine which parks are within the area the user specified.

![API](https://user-images.githubusercontent.com/46731977/106202792-69003580-6188-11eb-9ccd-352f151837fa.png)

GET activities/parks uses activity ids to retrieve parks in that category.  GET activities will be used to generate the list for the dropdown.  When a user selects activity filters, the activity id will be cross referenced with activities/park to see which parks fall under that activity.  More than one activity can be selected.

![API](https://user-images.githubusercontent.com/46731977/106202754-5a198300-6188-11eb-896c-aacedfba21c7.png)

GET topics/parks uses topic ids to retrieve parks in that category.  This functions much the same as activities.  GET topics will be used to generate the list for the dropdown.  When a user selects topic filters, the topic id will be cross referenced with topics/park to see which parks fall under that topic.  More than one topic can be selected.

![API](https://user-images.githubusercontent.com/46731977/106202821-761d2480-6188-11eb-9016-74daea05965d.png)

A maps API will be needed to utilize this data on a map.  The Google Maps API has features for [embedded maps](https://developers.google.com/maps/documentation/embed/map-generator).  The location the user entered will be the center of the map.  The latLong from GET parks will be utilized to drop location pins, which will be tied to the results list.

![API](https://user-images.githubusercontent.com/46731977/106809861-2fbd3f00-663a-11eb-833f-eb26eabf200b.png)

## Appetite
This system could be completed in a 6 week sprint.

## Rabbit Holes
A rabbit hole that can be considered for this sprint would be a feature that allows the user to view parks within a certain radius of a location. Users would be able to select parks in a certain radius and can then create an interactive route to such parks. The Google Maps API would embed maps to display the directions to and from the parks. The API also has a [directions mode](https://developers.google.com/maps/documentation/embed/embedding-map#directions_mode) that would be used to implement this if desired. This could involve generating directions between a list of parks, allowing the user to remove parks and edit the order they are visited in as they view routes with different mileages and drive times. However, this would be considered if the initial scope of the project is completed. Although this would be a nice feature to have, it is not necessary in this sprint and can be considered afterwards.

Amenities could be useful and are a part of the API for the NPS and could assist the user when it comes to things such as picnic sites, toilets, etc.

## No Goes
National Parks are represented by regions which are groups of states.  This would create a larger geographical area for the user to search but it still bounded.  It is also not represented in the NPS API.

Because the map will be centered around the original address / coordinates entered, a specific national park cannot be added to the map.  If the user has a specific park in mind, they may use existing NPS search features or use that park address as their start / center point.
