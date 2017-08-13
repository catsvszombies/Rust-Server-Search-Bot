console.log("main.js");

var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJlMTcyYWJhYWYyMzEzYjciLCJpYXQiOjE1MDI1OTQ2NDIsIm5iZiI6MTUwMjU5NDY0MiwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoyNjI";
var bmTestLink = "https://api.battlemetrics.com/servers";
var result;

var mainButton = document.getElementById("button");
mainButton.addEventListener("click", buttonFunction);

function buttonFunction() {
  console.log("buttonFunction()");
  httpGet(bmTestLink);
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    var params = "filter[game]=rust&page[size]=100&sort=distance";
    xmlHttp.open("GET", theUrl+"?"+params, true); // true for asynchronous
    xmlHttp.setRequestHeader("Authorization", token);

    xmlHttp.send(null);
}

function callback(responseText) {
  console.log("callback");
  console.log(responseText);

  result = JSON.parse(responseText);
  var data = result.data;

  var formatted = JSON.stringify(result, null, 2);
  document.getElementById("data").innerText = formatted;

  data.sort(function(a, b) {
    if (!(a.attributes.details && a.attributes.details.rust_last_wipe)) {
      return 1;
    }
    if (!(b.attributes.details && b.attributes.details.rust_last_wipe)) {
      return -1;
    }
    return new Date(b.attributes.details.rust_last_wipe) - new Date(a.attributes.details.rust_last_wipe);
  });

  var buffer = "";
  for (var i=0; i<data.length; i++) {
    buffer += "<tr>";
    buffer += "<td class=\"server-name\">" + data[i].attributes.name + "</td>";
    buffer += "<td class=\"last-wipe\">";
    if (data[i].attributes.details && data[i].attributes.details.rust_last_wipe) {
      var lastWipe = new Date(data[i].attributes.details.rust_last_wipe);
      buffer += lastWipe;
    }
    buffer += "</td>";
    buffer += "</tr>\n";
  }

  document.getElementById("servers").innerHTML = buffer;
}
