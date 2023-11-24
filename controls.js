// controls.js
import { checkDevice } from './responsive_phone.js';

export function addControls(map) {
   // Create a div for each control.
   var zoomDiv = document.createElement('div');
   var zoomInDiv = document.createElement('div');
   var zoomOutDiv = document.createElement('div');
   var centerMapDiv = document.createElement('div');
   var changeMapTypeDiv = document.createElement('div');

  // Add Zoom In, Zoom Out text to the buttons
  zoomInDiv.innerHTML = "<button class='zoom-in' style='width:100%; height:100%'>+</button>"
  zoomOutDiv.innerHTML = "<button class='zoom-out' style='width:100%; height:100%'>-</button>";

  // Style the divs
  zoomInDiv.style.backgroundColor = "#fff";
  zoomOutDiv.style.backgroundColor = "#fff";
  
  // Append the zoom in and out divs to the parent div
  zoomDiv.appendChild(zoomInDiv);
  zoomDiv.appendChild(zoomOutDiv);

  centerMapDiv.innerHTML = "<button class='center-map' style='width:100%; height:100%'>Center Map</button>";
  
  changeMapTypeDiv.innerHTML = "<button class='change-map-type' style='width:100%; height:100%'>Change Map Type</button>";



if (checkDevice() === "Mobile Device") {
    zoomInDiv.style.width = '125px';
    zoomInDiv.style.height = '125px';
    zoomOutDiv.style.width = '125px';
    zoomOutDiv.style.height = '125px';
    centerMapDiv.style.width = '125px';
    centerMapDiv.style.height = '125px';
    changeMapTypeDiv.style.width ='125px';
    changeMapTypeDiv.style.height ='125px'; 
}

  // Setup click event listeners for all buttons
  google.maps.event.addDomListener(zoomInDiv, 'click', function() {
     map.setZoom(map.getZoom() + 1);
  });

  google.maps.event.addDomListener(zoomOutDiv, 'click', function() {
     map.setZoom(map.getZoom() - 1);
  });

  google.maps.event.addDomListener(centerMapDiv, 'click', function() {
     map.setCenter(new google.maps.LatLng(29.3759, 47.9774)); // Set this to your desired coordinates
     map.setZoom(8); // Set this to your desired zoom level
  });

 google.maps.event.addDomListener(changeMapTypeDiv, 'click', function() {
     var currentMapType = map.getMapTypeId();
     map.setMapTypeId(currentMapType === google.maps.MapTypeId.ROADMAP ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP);
  });

   // Add controls to different positions on the map
   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(zoomDiv);
   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerMapDiv);
   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(changeMapTypeDiv);
}