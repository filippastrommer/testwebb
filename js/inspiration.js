var valjKnapp; //Global variabel för knappen att lägga till i listan
var sektionerLista; //Global variabel för listan där sektionerna ska läggas till
var APIkey = "e1EhETFh"; //API nyckel för smapi

function init() {

  //Definierar variabeln valjknapp till knappen i html
  valjKnapp = document.getElementsByClassName("valj-knapp");
  //Definierar variabeln sektionerLista till listan i html
  sektionerLista = document.getElementById("sektioner-lista");

  // Loopar igenom alla "valj-knapp" element och lägg till en klickhändelse på varje knapp
  for (var i = 0; i < valjKnapp.length; i++) {
    valjKnapp[i].addEventListener("click", function () {

      // Hitta den närmaste sektionen som användaren är vid och klonar den
      var valdSection = this.closest("section").cloneNode(true);

      //Skapar en ta bort-knapp till det klonade elementet för at kunna ta bort ur listan 
      var taBortKnapp = document.createElement("button");
      taBortKnapp.textContent = "";
      taBortKnapp.classList.add("ta-bort-knapp");

      //Skapar en funktione för att när man klickar på ta-bort knappen så ska deb raderas ur listan
      taBortKnapp.addEventListener("click", function () {
        sektionerLista.removeChild(valdSection);
      });

      valdSection.classList.add("emil-klon");

      // Dölj "valj-knapp" i den klonade sectionen
      valdSection.querySelector(".valj-knapp").style.display = "none";

      // Lägg till "Ta bort"-knappen i den klonade sectionen
      valdSection.appendChild(taBortKnapp);

      sektionerLista.appendChild(valdSection);
    });
  }

  //Kallar på funktionerna när sidan laddas
  requestData2();
  requestData3();
  requestData4();
  requestData5();
  requestData6();
  requestData7();
}

window.addEventListener("load", init)



//Funktion som hämtar data från smapi och json för sidan om glasriket
function requestData2() {
  //Ajax anrop för att hämta data ur smapi
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&ids=620,631,622,656");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let response = JSON.parse(request.responseText);
        let dataSmapi = response.payload;

        if (dataSmapi.length > 0) {
          //Hämtar varje id i Smapi
          for (let i = 0; i < dataSmapi.length; i++) {
            let data = dataSmapi[i];
            let sectionId = data.id;
            visaData(data, sectionId);
          }

          //Ajax anrop för att hämta data ur json för data som saknas i smapi
          let jsonRequest = new XMLHttpRequest();
          jsonRequest.open("GET", "/json/glasriketinspo.json", true);
          jsonRequest.onreadystatechange = function () {
            if (jsonRequest.readyState === 4 && jsonRequest.status === 200) {
              let jsonData = JSON.parse(jsonRequest.responseText);
              //Hämtar varje id i json
              for (let i = 0; i < jsonData.length; i++) {
                let objekt = jsonData[i];
                let sectionId = objekt.sectionId;
                visaData(objekt, sectionId);
              }
            }
          };
          jsonRequest.send();
        }
      }
    }
  };
}
//Funktion som hämtar data från smapi och json för sidan om Astrid Lindgren
function requestData3() {
  //Ajax anrop för att hämta data ur smapi
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&ids=714,712,3,247");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let response = JSON.parse(request.responseText);
        let dataSmapi = response.payload;
        //Hämtar varje id i Smapi
        if (dataSmapi.length > 0) {
          for (let i = 0; i < dataSmapi.length; i++) {
            let data = dataSmapi[i];
            let sectionId = data.id;
            visaData(data, sectionId);
          }
        }
      }
    }
  };
}
//Funktion som hämtar data från smapi och json för sidan om Jönköpings kultur
function requestData4() {
  //Ajax anrop för att hämta data ur smapi
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&ids=460,522,171");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let response = JSON.parse(request.responseText);
        let dataSmapi = response.payload;
        //Hämtar varje id i Smapi
        if (dataSmapi.length > 0) {
          for (let i = 0; i < dataSmapi.length; i++) {
            let data = dataSmapi[i];
            let sectionId = data.id;
            visaData(data, sectionId);
          }

          //Ajax anrop för att hämta data ur json för data som saknas i smapi
          let jsonRequest = new XMLHttpRequest();
          jsonRequest.open("GET", "/json/jkpinspo.json", true);
          jsonRequest.onreadystatechange = function () {
            if (jsonRequest.readyState === 4 && jsonRequest.status === 200) {
              let jsonData = JSON.parse(jsonRequest.responseText);
              //Hämtar varje id i json
              for (let i = 0; i < jsonData.length; i++) {
                let objekt = jsonData[i];
                let sectionId = objekt.sectionId;
                visaData(objekt, sectionId);
              }
            }
          };
          jsonRequest.send();
        }
      }
    }
  };
}

//Funktion som hämtar data från smapi och json för sidan om kulturen i kalmar
function requestData5() {
  //Ajax anrop för att hämta data ur smapi
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&ids=452,458,159,253");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let response = JSON.parse(request.responseText);
        let dataSmapi = response.payload;
        //Hämtar varje id i Smapi
        if (dataSmapi.length > 0) {
          for (let i = 0; i < dataSmapi.length; i++) {
            let data = dataSmapi[i];
            let sectionId = data.id;
            visaData(data, sectionId);
          }
          //Ajax anrop för att hämta data ur json för data som saknas i smapi
          let jsonRequest = new XMLHttpRequest();
          jsonRequest.open("GET", "/json/kalmarinspo.json", true);
          jsonRequest.onreadystatechange = function () {
            if (jsonRequest.readyState === 4 && jsonRequest.status === 200) {
              let jsonData = JSON.parse(jsonRequest.responseText);
              //Hämtar varje id i json
              for (let i = 0; i < jsonData.length; i++) {
                let objekt = jsonData[i];
                let sectionId = objekt.sectionId;
                visaData(objekt, sectionId);
              }
            }
          };
          jsonRequest.send();
        }
      }
    }
  };
}
//Funktion som hämtar data från smapi och json för sidan om Ölands kultur
function requestData6() {
  //Ajax anrop för att hämta data ur smapi
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&ids=678,679,680,681,684,170,270,685");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let response = JSON.parse(request.responseText);
        let dataSmapi = response.payload;
        //Hämtar varje id i Smapi
        if (dataSmapi.length > 0) {
          for (let i = 0; i < dataSmapi.length; i++) {
            let data = dataSmapi[i];
            let sectionId = data.id;
            visaData(data, sectionId);
          }
          //Ajax anrop för att hämta data ur json för data som saknas i smapi
          let jsonRequest = new XMLHttpRequest();
          jsonRequest.open("GET", "/json/olandinspo.json", true);
          jsonRequest.onreadystatechange = function () {
            if (jsonRequest.readyState === 4 && jsonRequest.status === 200) {
              let jsonData = JSON.parse(jsonRequest.responseText);
              //Hämtar varje id i json
              for (let i = 0; i < jsonData.length; i++) {
                let objekt = jsonData[i];
                let sectionId = objekt.sectionId;
                visaData(objekt, sectionId);
              }
            }
          };
          jsonRequest.send();
        }
      }
    }
  };
}
//Funktion som hämtar data från smapi och json för sidan om Växjö
function requestData7() {
  //Ajax anrop för att hämta data ur smapi
  let request = new XMLHttpRequest();
  request.open("GET", "https://smapi.lnu.se/api/?api_key=" + APIkey + "&debug=true&controller=establishment&method=getall&ids=468,433,636,454,618,284,269");
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        let response = JSON.parse(request.responseText);
        let dataSmapi = response.payload;
        //Hämtar varje id i Smapi
        if (dataSmapi.length > 0) {
          for (let i = 0; i < dataSmapi.length; i++) {
            let data = dataSmapi[i];
            let sectionId = data.id;
            visaData(data, sectionId);
          }

          //Ajax anrop för att hämta data ur json för data som saknas i smapi
          let jsonRequest = new XMLHttpRequest();
          jsonRequest.open("GET", "/json/vwoinspo.json", true);
          jsonRequest.onreadystatechange = function () {
            if (jsonRequest.readyState === 4 && jsonRequest.status === 200) {
              let jsonData = JSON.parse(jsonRequest.responseText);
              //Hämtar varje id i json
              for (let i = 0; i < jsonData.length; i++) {
                let objekt = jsonData[i];
                let sectionId = objekt.sectionId;
                visaData(objekt, sectionId);
              }
            }
          };
          jsonRequest.send();


        }
      }
    }
  };
}




function visaData(data, sectionId) {
  let sectionElements = document.getElementsByClassName("emil");
  let aktivitet;

  for (let i = 0; i < sectionElements.length; i++) {
    let element = sectionElements[i];
    if (element.getAttribute("data-id") === sectionId) {
      aktivitet = element.querySelector(".info");
      if (aktivitet) { // Kolla om aktivitet hittades
        aktivitet.innerHTML = ""; // Tömmer elementet endast om aktivitet hittades
        let info = "Besöksadress:\n" + data.address + "\n";
        info += data.zip_code + "\n";
        info += data.city + "\n";

        let infoElement = document.createElement("p");
        infoElement.innerText = info;
        aktivitet.appendChild(infoElement);

        let websiteButton = document.createElement("button");
        websiteButton.classList.add("webbsidaknapp");
        websiteButton.innerText = "Besök webbplatsen för mer information";
        websiteButton.addEventListener("click", function () {
          window.open(data.website, "_blank");
        });
        aktivitet.appendChild(websiteButton);
      } else {
        console.log("Kunde inte hitta .info-elementet för sectionId:", sectionId);
      }
      break;
    }
  }
}
