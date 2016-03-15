// Create map variable
var map;
require([ // Require ArcGIS modules
  "esri/map",
  "esri/dijit/BasemapToggle",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/KMLLayer",
  "dojo/domReady!"
], function ( // Create function that will be used to generate map
      Map,
      BasemapToggle,
      ArcGISDynamicMapServiceLayer,
      KMLLayer
    ) { // Create basemap with satellite view as default
        map = new Map("map", {
          basemap: "satellite",
          center: [-70, 30],
          zoom: 4
    });
    // Code to add topo layer and map control goes here
      var toggle = new BasemapToggle({
        map: map,
        basemap: "topo"
      }, "BasemapToggle");
      toggle.startup();

// Add SST WMS to map
      var layer1 = new ArcGISDynamicMapServiceLayer("http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/analysis_ocean_sfc_sst_time/MapServer");
      map.addLayer(layer1);

// Add weather buoy kml to map
     var kmlUrl = "http://earthnc.com/kml/earthncwxbuoys.kmz";
     var kml = new KMLLayer(kmlUrl);
     map.addLayer(kml);

  })
