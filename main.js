console.log("main.js");
var mainButton=document.getElementById("button");

var godInfo;

var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJlMTcyYWJhYWYyMzEzYjciLCJpYXQiOjE1MDI1OTQ2NDIsIm5iZiI6MTUwMjU5NDY0MiwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoyNjI";

mainButton.addEventListener("click", buttonFunction);


function buttonFunction(){
  console.log("buttonFunction()");
  httpGet(bmTestLink);
}

var bmTestLink = "https://api.battlemetrics.com/servers";

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    var params = "filter[game]=rust";
    xmlHttp.open("GET", theUrl+"?"+params, true); // true for asynchronous
    xmlHttp.setRequestHeader("Authorization", token);

    xmlHttp.send(null);
}



function callback(responseText) {
  console.log("callback");
  console.log(responseText);

  godInfo = JSON.parse(responseText);
  var formatted = JSON.stringify(godInfo, null, 2);

  document.getElementById("data").innerText = formatted;

  var buffer = "";
  for (var i=0; i<godInfo.data.length; i++) {
    buffer += godInfo.data[i].attributes.name;
    if (godInfo.data[i].attributes.details) {
      buffer += " - last wipe: " + godInfo.data[i].attributes.details.rust_last_wipe;
    }
    buffer += "\n";
  }

  document.getElementById("content").innerText = buffer;


  //console.log("Callback: " + responseText);
  /*console.log("godInfo: " + godInfo);
  for(var i = 0; i < godInfo.size; i++){
    console.log("Element #" + i + ": " + godInfo[i]);
  }*/
}



//Time to use godInfo
