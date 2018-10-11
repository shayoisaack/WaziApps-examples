var mymap = L.map("mapid").setView([-1.97, 30.1], 3);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiY2R1cG9udDIiLCJhIjoiY2pnZTVkZ2xsMGxyZTJ4cjA5dDZ4cjNneSJ9.NJT7CULfcY0mjeavffR_vg"
  }
).addTo(mymap);

Waziup.ApiClient.instance.basePath = "https://api.waziup.io/api/v1";
var api = new Waziup.SensorsApi();

function mockTrack() {
  var latlangs = [
    [-6.7931, 39.2078],
    [-6.7911, 39.1841],
    [-6.7862, 39.1604],
    [-6.7909, 39.1412],
    [-6.7945, 39.0705],
    [-6.7914, 39.008]
  ];
  //set source and destination
  var markers = Array();
  markers[markers.length] = L.marker(latlangs[0]);
  markers[markers.length] = L.marker(latlangs[latlangs.length - 1]);
  var featureGroup = L.featureGroup(markers).addTo(mymap);

  var geocodeService = L.esri.Geocoding.geocodeService();
  geocodeService
    .reverse()
    .latlng(latlangs[0])
    .run(function(error, result) {
      $("#from").html(formatAddr(result.address.Match_addr));
    });
  geocodeService
    .reverse()
    .latlng(latlangs[latlangs.length - 1])
    .run(function(error, result) {
      $("#to").html(formatAddr(result.address.Match_addr));
    });

  //zoom into area
  mymap.fitBounds(featureGroup.getBounds(), { padding: [80, 80] });

  //draw path
  var color = "blue";
  for (let i = 0; i < latlangs.length - 1; i++) {
    if (i === 3) {
      color = "grey";
      L.marker(latlangs[i])
        .addTo(mymap)
        .bindPopup("Isaack")
        .openPopup();
      geocodeService
        .reverse()
        .latlng(latlangs[i])
        .run(function(error, result) {
          $("#current-location").html(formatAddr(result.address.Match_addr));
        });
    }
    var polyline = L.polyline([latlangs[i], latlangs[i + 1]], {
      color: color
    }).addTo(mymap);
  }
}

var gwAddr = "waziup-ISPACE-KITA";
var nodeAddr = "ISPACE_Sensor3";

function liveTrack() {
  var markers = [];
    api.getSensors("waziup", { limit: 1000 }).then(sensors => {
      //console.log("data" + JSON.stringify(sensors));
      for (sensor of sensors) {
        if (sensor.location) {
            console.log('gps', sensor);
          L.marker([sensor.location.latitude, sensor.location.longitude]).addTo(
            mymap
          );
        }
      }
    });
}

function formatAddr(addr) {
  let addArr = addr.split(",");
  return addArr[addArr.length - 1];
}

mockTrack();
liveTrack();
