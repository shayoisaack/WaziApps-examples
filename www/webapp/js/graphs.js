var gwAddr = "waziup-ISPACE-KITA";
var nodeAddr = "ISPACE_Sensor3";

$("#gw-addr").html(gwAddr);
Waziup.ApiClient.instance.basePath = "https://api.waziup.io/api/v1";
var api = new Waziup.SensorsApi();
var data = [];
var labels = [];
api
  .getMeasurementValues(gwAddr, nodeAddr, "HM", { lastN: "20" })
  .then(values => {
    //console.log("data" + JSON.stringify(values));
    for (value of values) {
      data.push(value.value);
      //console.log("time stamp", value.timestamp);
      labels.push(value.timestamp);
    }
    $("#node-addr-humidity").html(nodeAddr);
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sensor values",
            data: data
          }
        ]
      },
      options: {
        responsive: false
      }
    });
  });

api
  .getMeasurementValues(gwAddr, nodeAddr, "TC", { lastN: "20" })
  .then(values => {
    //console.log("data" + JSON.stringify(values));
    for (value of values) {
      data.push(value.value);
      //console.log("time stamp", value.timestamp);
      labels.push(value.timestamp);
    }
    $("#node-addr-temperature").html(nodeAddr);
    var ctx = document.getElementById("chart-temperature").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sensor values",
            data: data
          }
        ]
      },
      options: {
        responsive: false
      }
    });
  });
api
  .getMeasurementValues(gwAddr, nodeAddr, "MS", { lastN: "20" })
  .then(values => {
    //console.log("data" + JSON.stringify(values));
    for (value of values) {
      data.push(value.value);
      //console.log("time stamp", value.timestamp);
      labels.push(value.timestamp);
    }
    $("#node-addr-motion").html(nodeAddr);
    var ctx = document.getElementById("chart-motion").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sensor values",
            data: data
          }
        ]
      },
      options: {
        responsive: false
      }
    });
  });
