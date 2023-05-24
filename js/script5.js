
var APIkey = "e1EhETFh";
var listalista;

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

function requestData() {
   let request = new XMLHttpRequest();
     request.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=museum&counties=jönköpings län");
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
    let request2 = new XMLHttpRequest();
      request2.open("GET","https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getAll&descriptions=slott&counties=jönköpings län");
     request2.send(null);
 
 
     request2.onreadystatechange = function () {
         if (request2.readyState == 4) {
             if (request2.status == 200) { 
 
                 getData(request2.responseText);
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
 
                 getData(request3.responseText);
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
 
                 getData(request4.responseText);
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
 
                 getData(request5.responseText);
             } 
         }
     };
 }


function getData(responseText) {
    var response = JSON.parse(responseText);
    console.log("response:", response);
    if (listalista != null) {
     listalista.innerHTML="";
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
      item.abstract + 
      "</p>" +
          "<p>" +
      item.text +
      "</p>" +
      "<p><button onclick=\"window.location.href='" +
    item.website +
    "'\">Besök webbplatsen</button></p>" +
    "<p>";

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