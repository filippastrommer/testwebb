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
    zoom: 7
  });
}

function requestData() {
   let request = new XMLHttpRequest();
     request.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=museum&counties=kronobergs län");
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
      request2.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=slott&counties=kronobergs län");
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
      request3.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=kyrka&counties=kronobergs län");
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
      request4.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=sevärdhet&counties=kronobergs län");
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
      request5.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=konsthall&counties=kronobergs län");
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
    var listatext = document.getElementById("description");
    listatext.innerHTML = "";
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


  /*function showAttractionDetails(item) {
  
    var listatext = "";
    listatext +=
      "<h2>" +
      item.name +
      "</h2>" +
      "<div id=adress>" +
  "<li id=\"adressicon\">" +
  "<span class=\"icon\"><img src=\"img/iconplace.svg\"</span>" + 
  "<span class=\"address\">" + item.address + "</span>" +
 "</li>"  + "</div>" +
      item.zip_code 
     + " "  +
      item.city +
      "</p>" +
      "<div id=telefonnummer>" +
      "<li id=\"adressicon\">" +
  "<span class=\"icon\"><img src=\"img/iconphone.svg\"</span>" + 
  "<span class=\"address\">" + item.phone_number + "</span>" +
  "</li>"  +
      "</div>"
      +
     
          "<p id=\"text\">" +
      item.text +
      "</p>" +
      "<p><button onclick=\"window.location.href='" +
    item.website +
    "'\">Besök webbplatsen</button></p>";



    document.getElementById("description").innerHTML = listatext; //Den fungerande koden istället för details.

    let request = new XMLHttpRequest();
    request.open("GET", "json/kronoberg.json");
    request.send(null);
    request.onreadystatechange = function() {
      let file = document.getElementById("json"); 
      file.innerHTML = "";
      if (request.readyState == 4 && request.status == 200) {
       
        var jönkData = JSON.parse(request.responseText);
         // Replace "452" with the actual chosen ID
    
        var selectedMuseum = jönkData.find(function(kronoberg) {
          return kronoberg.kronoberg_id === item.id;
        });
    
        if (selectedMuseum) {
          var openingHoursText = "<div id=open><li id=\"adressicon\">" +
          "<span class=\"icon\"><img src=\"img/icontime.svg\"</span>" + // Replace [ICON] with the actual icon code or image
          "<span class=\"address\"></span>" +
          "</li> </div>";
          for (var day in selectedMuseum.opening_hours) {
            openingHoursText += "<div id=open>" + day + ": " + selectedMuseum.opening_hours[day] + "</div>";
          }
          file.innerHTML += openingHoursText;
    
          var pricesText = "<div id=pris><li id=\"adressicon\">" +
          "<span class=\"icon\"><img src=\"img/iconprice.svg\"</span>" + // Replace [ICON] with the actual icon code or image
          "<span class=\"address\"></span>" +
          "</li> </div>";
          for (var key in selectedMuseum.pris) {
            pricesText += "<div id=pris>" + selectedMuseum.pris[key] + "</div>";
          }
          file.innerHTML += pricesText;
        }
      }
    };
   
  }    */
  function showAttractionDetails(item) {
    var listatext = document.getElementById("description");
    listatext.innerHTML = ""; // Clear the previous content
  
    var attractionName = "<h2>" + item.name + "</h2>";
    var addressText = "<div id=\"adress\"><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/iconplace.svg\"></span><span class=\"address\">" + item.address + "</span></li></div>" + item.zip_code + ", " + item.city + "</p>";
    var phoneText = "<div id=\"telefonnummer\"><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/iconphone.svg\"></span><span class=\"address\">" + item.phone_number + "</span></li></div>";
    var openingHoursText = "<div id=\"open\"><p><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/icontime.svg\"></span><span class=\"address\"></span>";
    var pricesText = "<div id=\"pris\"><p><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/iconprice.svg\"></span><span class=\"address\"></span>";
  
    var descriptionText = "<div id=\"descriptionName\"><p id=\"text\">" + item.text + "</p></div>";
    var websiteButton = "<p><button onclick=\"window.location.href='" + item.website + "'\">Besök webbplatsen</button></p>";
  /*
    var request = new XMLHttpRequest();
    request.open("GET", "json/kronoberg.json");
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var jkpgData = JSON.parse(request.responseText);
        var selectedMuseum = jkpgData.find(function(kronoberg) {
          return kronoberg.kronoberg_id === item.id;
        });
  
        if (selectedMuseum) {
          for (var day in selectedMuseum.opening_hours) {
            openingHoursText += "" + day + ": " + selectedMuseum.opening_hours[day] + "</p>";
          }
          openingHoursText += "</div>";
          for (var key in selectedMuseum.pris) {
            pricesText += "" + selectedMuseum.pris[key] + "</p>";
          }
          pricesText += "</div>";

        }
  
        listatext.innerHTML += attractionName + addressText + phoneText + openingHoursText + pricesText + descriptionText + websiteButton;
      }
    };*/
  }
  