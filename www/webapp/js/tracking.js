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
//   var latlangs = [
//     [-6.7931, 39.2078],
//     [-6.7911, 39.1841],
//     [-6.7862, 39.1604],
//     [-6.7909, 39.1412],
//     [-6.7945, 39.0705],
//     [-6.7914, 39.008]
//   ];

  var latlangs = [
      [-6.7570,38.9308],
      [-6.7703,38.9669],
      [-6.7908,39.0080],
      [-6.7902,39.0197],
      [-6.7906,39.0453],
      [-6.7943,39.0724],
      [-6.7938,39.0914],
      [-6.7831,39.1253],
      [-6.7914,39.1342],
      [-6.7862,39.1646],
      [-6.7912,39.1885],
      [-6.7900,39.1916],
      [-6.7924,39.2082],
      [-6.7876,39.2093],
      [-6.7829,39.2140],
      [-6.7666,39.2278],
      [-6.7640,39.2293],
      [-6.7747,39.2430],//buni 17
      [-6.77525,39.24373],
      [-6.7786,39.2533],
      [-6.7772,39.2641],
      [-6.7816,39.2747],
      [-6.7992,39.2823],
      [-6.8001,39.2832],
      [-6.8030,39.2859],
      [-6.8104,39.2861]
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
  
  var redMarker = L.AwesomeMarkers.icon({
    icon: 'truck',
    markerColor: 'darkgreen',
    prefix: 'fa'
  });

  //draw path
  var color = "blue";
  for (let i = 0; i < latlangs.length - 1; i++) {
    if (i === 17) {
      color = "grey";
      L.marker(latlangs[i], {icon: redMarker})
        .addTo(mymap)
        .bindPopup("Isaack");

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
    // api.getSensors("waziup", { limit: 1000 }).then(sensors => {
    //   //console.log("data" + JSON.stringify(sensors));
    //   for (sensor of sensors) {
    //     if (sensor.location) {
    //         console.log('gps', sensor);
    //       L.marker([sensor.location.latitude, sensor.location.longitude]).addTo(
    //         mymap
    //       );
    //     }
    //   }
    // });
    api.getSensor("waziup-ISPACE-KITA", "ISPACE_Sensor3").then(sensor => {
        for(let i = 0; i < sensor.measurements.length; i++)
            console.log('gps', sensor.measurements[i].last_value);
    });
}

function formatAddr(addr) {
  let addArr = addr.split(",");
  return addArr[addArr.length - 1];
}

mockTrack();
liveTrack();
