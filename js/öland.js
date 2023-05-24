
var APIkey = "e1EhETFh";
var listalista;

function init () {
  listalista = document.getElementById("lista");
  document.getElementById("description");
  document.getElementById("Museum").addEventListener("click", requestData);
  document.getElementById("Slott").addEventListener("click", requestData2);
}
window.addEventListener("load", init)

function requestData() {
   let request = new XMLHttpRequest();
     request.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=museum");
    request.send(null);


    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) { 

                getData(request.responseText);
            } 
        }
    };
}
function requestData2() {
  let request = new XMLHttpRequest();
    request.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&provinces=öland&descriptions=slott");
   request.send(null);


   request.onreadystatechange = function () {
       if (request.readyState == 4) {
           if (request.status == 200) { 

               getData(request.responseText);
           } 
       }
   };
}


function getData(responseText) {
    var response = JSON.parse(responseText);
    console.log("response:", response);
    if (listalista != null) {
      for (var i = 0; i < response.payload.length; i++) {
        var item = response.payload[i];
        var button = document.createElement("button");
        button.textContent = item.name;
        button.addEventListener(
          "click",
          (function (item) {
            return function () {
              showAttractionDetails(response, item);
            };
          })(item)
        );
        listalista.appendChild(button);
      }
    }
  }

  function showAttractionDetails(response, item) {
    var listatext = "";
    listatext +=
      "<p>" +
      item.name +
      "</p>" +
      "<p>" +
      item.address +
      "</p>" +
      "<p>" +
      item.phone_number +
      "</p>"
      +
      "<p>" +
      item.zip_code +
      "</p>" +
      "<p>" +
      item.city +
      "</p>" +
      "<p>" +
      item.price_range +
      "</p>" +
      "<p>" +
      item.website +
      "</p>";

    var details = document.createElement("details");
    details.innerHTML = listatext;
    let description = item.name;
    document.getElementById("descriptionName").textContent = description;
  
    var existingDetails = document.getElementById("description").querySelector("details");
    if (existingDetails) {
      existingDetails.remove();
    }
  
    document.getElementById("description").appendChild(details);
  }