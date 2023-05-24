var googleKey = "AIzaSyDx1uNg6uHHt6Q1g7az8LyXpLqRbySEET4";
var APIkey = "e1EhETFh";
var listalista;
var itemLat; 
var itemLng; 
var markers = [];
var map;

function init () {
  
  listalista = document.getElementById("lista");
  document.getElementById("description");
  document.getElementById("Museum").addEventListener("click", requestData);
  document.getElementById("Slott").addEventListener("click", requestData2);
  document.getElementById("Kyrka").addEventListener("click", requestData3);
  document.getElementById("Sevärdigheter").addEventListener("click", requestData4);
  document.getElementById("Konst").addEventListener("click", requestData5);

}
window.addEventListener("load", init)

function initMap() {
  var mapDiv = document.getElementById("map");
  map = new google.maps.Map(mapDiv, {
    center: { itemLat, itemLng},
    zoom: 13
  });
}

function requestData() {
   let request = new XMLHttpRequest();
     request.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=museum&counties=jönköpings län");
    request.send(null);


    request.onreadystatechange = function () {
        if (request.readyState == 4) {
          if (request.status == 200) {
            var response = JSON.parse(request.responseText);
            initMap();
            getData(response.payload);
            } 
        }
    };
}

function requestData2() {
    let request2 = new XMLHttpRequest();
      request2.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=slott&counties=jönköpings län");
     request2.send(null);
 
 
     request2.onreadystatechange = function () {
         if (request2.readyState == 4) {
          if (request2.status == 200) {
            var response = JSON.parse(request2.responseText);
            initMap();
            getData(response.payload);
             } 
         }
     };
 }

 function requestData3() {
    let request3 = new XMLHttpRequest();
      request3.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=kyrka&counties=jönköpings län");
     request3.send(null);
 
 
     request3.onreadystatechange = function () {
         if (request3.readyState == 4) {
          if (request3.status == 200) {
            var response = JSON.parse(request3.responseText);
            initMap();
            getData(response.payload);
             } 
         }
     };
 }

 function requestData4() {
    let request4 = new XMLHttpRequest();
      request4.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=sevärdhet&counties=jönköpings län");
     request4.send(null);
 
 
     request4.onreadystatechange = function () {
         if (request4.readyState == 4) {
          if (request4.status == 200) {
            var response = JSON.parse(request4.responseText);
            initMap();
            getData(response.payload);
             } 
         }
     };
 }

 function requestData5() {
    let request5 = new XMLHttpRequest();
      request5.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=konsthall&counties=jönköpings län");
     request5.send(null);
 
 
     request5.onreadystatechange = function () {
         if (request5.readyState == 4) {
          if (request5.status == 200) {
            var response = JSON.parse(request5.responseText);
            initMap();
            getData(response.payload);
             } 
         }
     };
 }


function getData(items) {
  var listalista = document.getElementById("lista");
  listalista.innerHTML = ""; // Clear the previous list
  markers = [];

  for (var i = 0; i < items.length; i++) {
    document.getElementById("map").classList.add("hidden");
    var item = items[i];
    var button = document.createElement("button");
    button.textContent = item.name;
    button.classList.add("activity-button");
    button.addEventListener("click", function (item) {
      return function () {
        showMarker(item);
        showAttractionDetails(item);
      };
    }(item));

    listalista.appendChild(button);
    console.log("hej");
   
  
  }
  markers.forEach(function (marker) {
    marker.setVisible(true);
  });
  if (markers.length > 0) {
    var latLng = markers[0].getPosition();
    map.setCenter(latLng);
  }
  
}

function addMarker(item) {
  
    var lat = parseFloat(item.lat);
  var lng = parseFloat(item.lng);

  var marker = new google.maps.Marker({
    
    position: { lat: lat, lng: lng },
    map: map,
    title: item.name
  });

  
  marker.item = item;
  markers.push(marker); 
  // Store the marker as a property of the item

}


function showMarker(item) {
  // Hide all markers first
  document.getElementById("map").classList.remove("hidden");
  markers.forEach(function (marker) {
    marker.setVisible(false);
  });
  addMarker(item); 

  // Find the marker associated with the selected item
  var marker = markers.find(function (marker) {
    return marker.item === item;
  });

  if (marker) {
    marker.setVisible(true); // Show the selected marker
    map.setCenter(marker.getPosition()); // Center the map on the selected marker
  }
}



  function showAttractionDetails(item) {
    var listatext = "";
    listatext +=
      "<p>" +
      item.name +
      "</p>" +
      "<p>" +
      item.address +
      "</p>" +
      "<p>" +
     
      "<p>" +
      item.zip_code +
      "</p>" +
      "<p>" +
      item.city +
      "</p>" +
      "<p>" + 
       item.phone_number +
      "</p>"
      +
     
      item.abstract + 
      "</p>" +
          "<p>" +
      item.text +
      "</p>" +
      "<p><button onclick=\"window.location.href='" +
    item.website +
    "'\">Besök webbplatsen</button></p>" +
    "<p>";
    


    document.getElementById("description").innerHTML = listatext; //Den fungerande koden istället för details.

  }