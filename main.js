console.log("main.js");
var mainButton=document.getElementById("button");

var godInfo;

var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImJlMTcyYWJhYWYyMzEzYjciLCJpYXQiOjE1MDI1OTQ2NDIsIm5iZiI6MTUwMjU5NDY0MiwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjoyNjI";

mainButton.addEventListener("click", buttonFunction);


function buttonFunction(){
  console.log("buttonFunction()");
  var result = httpGet(bmTestLink);
  console.log("Result: " + result);
}

var bmTestLink = "https://api.battlemetrics.com/servers";

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        var params = "filter:game=rust";
        xmlHttp.open("GET", theUrl+"?"+params, true); // true for asynchronous
        xmlHttp.setRequestHeader("Authorization", token);

        xmlHttp.send(null);
}



function callback(response){
  console.log("callback");

  godInfo = JSON.parse(response);
  console.log(godInfo);
  document.getElementById("content").innerHTML = godInfo;
  //console.log("Callback: " + response);
  /*console.log("godInfo: " + godInfo);
  for(var i = 0; i < godInfo.size; i++){
    console.log("Element #" + i + ": " + godInfo[i]);
  }*/
}



//Time to use godInfo
