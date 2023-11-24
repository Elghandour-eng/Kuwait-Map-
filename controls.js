// controls.js

export function addControls(map) {
    // Create a div for each control.
    var zoomInDiv = document.createElement('div');
    var zoomOutDiv = document.createElement('div');
    var centerMapDiv = document.createElement('div');
    var changeMapTypeDiv = document.createElement('div');

   // Add Zoom In, Zoom Out, Center Map and Change Map Type text to the buttons
   zoomInDiv.innerHTML = "<img src='map/images/zoom-in.svg' alt='zoom in' />";
   zoomInDiv.style.backgroundColor = "#fff";
   zoomOutDiv.innerHTML = "Zoom Out";
   centerMapDiv.innerHTML = "Center Map";
   changeMapTypeDiv.innerHTML = "Change Map Type";

   // Setup click event listeners for all buttons
   google.maps.event.addDomListener(zoomInDiv, 'click', function() {
      map.setZoom(map.getZoom() + 1);
   });

   google.maps.event.addDomListener(zoomOutDiv, 'click', function() {
      map.setZoom(map.getZoom() - 1);
   });

   google.maps.event.addDomListener(centerMapDiv, 'click', function() {
      map.setCenter(new google.maps.LatLng(29.3759, 47.9774)); // Set this to your desired coordinates
   });

   google.maps.event.addDomListener(changeMapTypeDiv, 'click', function() {
      var currentMapType = map.getMapTypeId();
      map.setMapTypeId(currentMapType === google.maps.MapTypeId.ROADMAP ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP);
   });

    // Add controls to different positions on the map
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(zoomInDiv);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(zoomOutDiv);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(centerMapDiv);
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(changeMapTypeDiv);
}