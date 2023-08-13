//Globala variabler

var googleKey = "AIzaSyDx1uNg6uHHt6Q1g7az8LyXpLqRbySEET4";
var APIkey = "e1EhETFh";
var listalista;
var itemLat;
var itemLng;
var markers = [];
var map;

//Funktion för vad som laddas in direkt när webbsidan öppnas.
function init() {

  listalista = document.getElementById("lista");
  document.getElementById("description");
  document.getElementById("Museum").addEventListener("click", requestData);
  document.getElementById("Slott").addEventListener("click", requestData2);
  document.getElementById("Kyrka").addEventListener("click", requestData3);
  document.getElementById("Sevärdigheter").addEventListener("click", requestData4);
  document.getElementById("Konst").addEventListener("click", requestData5);

}
window.addEventListener("load", init)

//Funktion för att hämtning av Google maps.
function initMap() {
  var mapDiv = document.getElementById("map");
  map = new google.maps.Map(mapDiv, {
    center: itemLat, itemLng,
    zoom: 11
  });
}

//Funktion för begära datahämtningen av museum från SMAPI på Öland, och samtidigt koppla Google maps till förfrågningen av datan.
function requestData() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=museum");
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

//Funktion för begära datahämtningen av slott från SMAPI På Öland, och samtidigt koppla Google maps till förfrågningen av datan.
function requestData2() {
  let request2 = new XMLHttpRequest();
  request2.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=slott");
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

//Funktion för begära datahämtningen av kyrkor från SMAPI på Öland, och samtidigt koppla Google maps till förfrågningen av datan.
function requestData3() {
  let request3 = new XMLHttpRequest();
  request3.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=kyrka");
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

//Funktion för begära datahämtningen av sevärdheter från SMAPI på Öland, och samtidigt koppla Google maps till förfrågningen av datan.
function requestData4() {
  let request4 = new XMLHttpRequest();
  request4.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=sevärdhet");
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

//Funktion för begära datahämtningen av konsthallar från SMAPI på Öland, och samtidigt koppla Google maps till förfrågningen av datan.
function requestData5() {
  let request5 = new XMLHttpRequest();
  request5.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=konsthall");
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


//Funktion att efter förfrågningen från request-funktion, hämta datan från SMAPI och Google maps. Därmed koppla SMAPI med Google maps utskrift av information om den begärda datan.

function getData(items) {
  var listatext = document.getElementById("description");
  listatext.innerHTML = "";
  var listalista = document.getElementById("lista");
  listalista.innerHTML = "";   // Kod för att elementen ska vara tomma innan datan efterfrågats, och om data existerar i elementen ska den tömmas vid ny förfrågan av data.
  markers = []; //Tom array för markering på kartan för att det ska vara tomt innan en specifik begäran av attraktion.


  // En loop för att mappen ska vara gömd och tom innan specifik data-begäran görs, för att den ska endast visas om en förfrågan skett och isåfall visas centrerad baserad på attrakrionens position och för att därmed markera ut placeringen på kartan. Detta med koordinater från SMAPI.
  //För en underlättning av kodningen har payloaden från SMAPI kallats för item.

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

  }
  markers.forEach(function (marker) {
    marker.setVisible(true);
  });
  if (markers.length > 0) {
    var latLng = markers[0].getPosition();
    map.setCenter(latLng);
  }

}

//Funktion för utskriften av markeringen på kartan, så genom att hämta koordinater från SMAPI och koppla samman med Google maps få placeringen med en markering på kartan.
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


}


//Funktion för att markeringen på kartan ska endast synas om den begärda datan sker, så om en attraktion väljs ska markeringen bara visas då och tas bort eller bytas vid ny begärd data.
function showMarker(item) {
  document.getElementById("map").classList.remove("hidden");
  markers.forEach(function (marker) {
    marker.setVisible(false);
  });
  addMarker(item);


  var marker = markers.find(function (marker) {
    return marker.item === item;
  });

  if (marker) {
    marker.setVisible(true);
    map.setCenter(marker.getPosition());
  }
}



//Funktion för hur listan av datahämtningen ska skrivas ut genom den tidigare begäran av datan, kopplas till de olika payload (item) i SMAPI och sedan inlägg med olika bilder som ikoner i listan. Även en begäran av JSON-filen med den externa informationen om attraktionerna, som ska begäras ut i samma lista som från SMAPI.
function showAttractionDetails(item) {
  var listatext = document.getElementById("description");
  listatext.innerHTML = ""; // Tömning av listan innan en ny utskrift.

  var attractionName = "<h2>" + item.name + "</h2>";
  var addressText = "<div id=\"adress\"><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/iconplace.svg\"></span><span class=\"address\">" + item.address + "</span></li></div>" +
    item.zip_code + ", " + item.city + "</p>";
  var phoneText = "<div id=\"telefonnummer\"><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/iconphone.svg\"></span><span class=\"address\">" + item.phone_number + "</span></li></div>";
  var openingHoursText = "<div id=\"open\"><p><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/icontime.svg\"></span><span class=\"address\"></span>";
  var pricesText = "<div id=\"pris\"><p><li id=\"adressicon\"><span class=\"icon\"><img src=\"img/iconprice.svg\"></span><span class=\"address\"></span>";


  var descriptionText = "<div id=\"descriptionName\"><p id=\"text\">" + item.text + "</p></div>";
  var websiteButton = "<p><button onclick=\"window.location.href='" + item.website + "'\">Besök webbplatsen</button></p>";

  var request = new XMLHttpRequest();
  request.open("GET", "json/oland.json");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var ölandData = JSON.parse(request.responseText);
      var selectedMuseum = ölandData.find(function (oland) {
        return oland.oland_id === item.id;
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
  };
}