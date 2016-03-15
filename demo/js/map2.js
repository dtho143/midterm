// Create map
function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map (mapDiv, {
    center: {lat: 35, lng: -75},
    zoom: 4,
  });

  // Add geojson to map
  map.data.loadGeoJson('https://raw.githubusercontent.com/dtho143/midterm/gh-pages/demo/data/damage.geojson')

  // global infowindow
  var infowindow = new google.maps.InfoWindow();

  // When the user clicks, open an infowindow
  // Infowindow contents spaced out to avoid crashing
  map.data.addListener('click', function(event) {
      var myHTML = "Storm Name: " + event.feature.getProperty("STORM NAME") + "<br>" + "Landfall Date: " + event.feature.getProperty("LANDFALL DATE") + "<br>";
      var myHTML2 = "Damage Rank: " + event.feature.getProperty("DAMAGE RANK") + "<br>" + "Current Damage ($ 2016): "+ event.feature.getProperty("CURRENT DAMAGE ($ 2016)") + "<br>";
      var myHTML3 = "Base Damage ($): " + event.feature.getProperty("BASE DAMAGE ($)") + "<br>" + "Category: " + event.feature.getProperty("CATEGORY") + "<br>";
      var myHTML4 = "Winds (MPH): " + event.feature.getProperty("WINDS(MPH)");
      infowindow.setContent("<div style='width:200px; text-align: center;'>"+myHTML+myHTML2+myHTML3+myHTML4+"</div>");
      infowindow.setPosition(event.feature.getGeometry().get());
      infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infowindow.open(map);
  });
}
