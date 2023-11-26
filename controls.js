
export function addControls(map) {
   // Create a div for each control.
   var zoomDiv = document.createElement('div');
   zoomDiv.classList.add('zoom-controls');
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

  centerMapDiv.innerHTML = "<button class='center-map' style='width:100%; height:100%'><img src='map/images/nearMe.svg'/></button>";
  
  changeMapTypeDiv.innerHTML = "<button class='change-map-type' style='width:100%; height:100%'><img src='map/images/maptype.png'/></button>";



  // Setup click event listeners for all buttons
  google.maps.event.addDomListener(zoomInDiv, 'click', function() {
     map.setZoom(map.getZoom() + 1);
     closeSidebars();
  });

  google.maps.event.addDomListener(zoomOutDiv, 'click', function() {
     map.setZoom(map.getZoom() - 1);
     closeSidebars();
  });

  google.maps.event.addDomListener(centerMapDiv, 'click', function() {
     map.setCenter(new google.maps.LatLng(29.3759, 47.9774)); // Set this to your desired coordinates
     map.setZoom(8); // Set this to your desired zoom level
     closeSidebars();
  });

 google.maps.event.addDomListener(changeMapTypeDiv, 'click', function() {
     var currentMapType = map.getMapTypeId();
     map.setMapTypeId(currentMapType === google.maps.MapTypeId.ROADMAP ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP);
     closeSidebars();
  });

   // Add controls to different positions on the map
   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(zoomDiv);
   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerMapDiv);
   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(changeMapTypeDiv);

function closeSidebars() {
    var sidebar = document.getElementById("sidebar");
    var mobilebar = document.getElementById("mobilebar");

    // Check if sidebars are active
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }

    if (mobilebar.classList.contains('active')) {
        mobilebar.classList.remove('active');
   }
}
}