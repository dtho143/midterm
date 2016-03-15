// Create map, centering map image on United States, set zoom level
var map = L.map('map').setView([37, -97], 4);

// Create Open Street Map basemap layer, with attribution
var streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

  // Create a tile layer (basemap) object with satellite imagery
var satellite = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
  type: 'sat',
  ext: 'jpg',
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
  subdomains: '1234'
});

// Create map layer displaying infrared satellite imagery via GOES
var goes = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_goes_time/MapServer/WMSServer", {
      layers: '1',
      format: 'image/png',
      transparent: true,
      attribution: "NOAA",
      opacity: 0.75 // Dim layer so basemap underneath can be seen
  }).addTo(map);  // Add layer to map

// Create map layer displaying base reflectivity radar imagery via Iowa State Mesonet
var radar = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
}).addTo(map); // Add layer to map

// Create map layer displaying lightning strike data via NOAA
var lightning = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer", {
  layers: '1',
  format: 'image/png',
  transparent: true,
  attribution: "" // NOAA was previously cited, so attribution was left blank here
}).addTo(map);  // Add layer to map

// Create an object with layers for each basemap
var baseLayers = {
    "Streets": streets,
    "Satellite": satellite
};

// Create controls for each map layer to provide option to toggle layer off/on
var overlays = {
    "GOES IR": goes,
    "Radar": radar,
    "Lightning": lightning
};

L.control.layers(baseLayers, overlays).addTo(map); // Add controls to map
