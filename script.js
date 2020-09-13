// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function(){
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then( function(json){
         let destination = document.getElementById("missionTarget");
         let i = Math.floor(Math.random()*json.length);
         destination.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[i].name}</li>
            <li>Diameter: ${json[i].diameter}</li>
            <li>Star: ${json[i].star}</li>
            <li>Distance from Earth: ${json[i].distance}</li>
            <li>Number of Moons: ${json[i].moons}</li>
         </ol>
         <img src="${json[i].image}">
         `;
      });
   });

   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function(){
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         alert("All fields are required!");
         event.preventDefault();
      }
      
      if  (isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))){
         alert("Fuel Level and Cargo Mass must be valid numbers");
         event.preventDefault();
      }

      document.getElementById("pilotStatus").innerHTML = `${pilotNameInput.value} is ready for launch.`;
      document.getElementById("copilotStatus").innerHTML = `${copilotNameInput.value} is ready for launch.`;

         //If fuelLevel < 10K liters, change #faultyItems to Visible & update fuel status to "Not enough fuel for the journey"
         //& text of h2 element should change to "Shuttle not ready for launch!" w/ color of RED.
      if (Number(fuelLevelInput.value) < 10000){
         let updateVisibility = document.getElementById("faultyItems");
         let updateFuelStatus = document.getElementById("fuelStatus");
         let updateLaunchStatus = document.getElementById("launchStatus");

         updateVisibility.style.visibility = "visible";
         updateFuelStatus.innerHTML = "Not enough fuel for the journey!";
         updateLaunchStatus.innerHTML = "Shuttle not ready for launch!" ;
         updateLaunchStatus.style.color = "red";
         
         event.preventDefault();
      } 

      if (Number(cargoMassInput.value) > 10000){
         let updateVisibility = document.getElementById("faultyItems");
         let updateCargoStatus = document.getElementById("cargoStatus");
         let updateLaunchStatus = document.getElementById("launchStatus");

         updateVisibility.style.visibility = "visible";
         updateCargoStatus.innerHTML = "Too much mass for take off!";
         updateLaunchStatus.innerHTML = "Shuttle not ready for launch!" ;
         updateLaunchStatus.style.color = "red";
         
         event.preventDefault();
      } 

      else {
         if (Number(cargoMassInput.value) < 10000 && Number(fuelLevelInput.value) > 10000){
            let updateLaunchStatus = document.getElementById("launchStatus");

            updateLaunchStatus.innerHTML = "Shuttle is ready for launch.";
            updateLaunchStatus.style.color = "green"

            event.preventDefault();
         }
      }
   });
});