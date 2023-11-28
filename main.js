import { mapProperties } from './mapConfig.js';
import { drawPolygon } from './drawPolygon.js';
import { checkDevice } from './responsive_phone.js';
import { addControls } from './controls.js';

let markers = []; 
let infoWindow;
let activeMarker = null;



export  async function initialize() {


   

            // Check if google.maps.OverlayView is loaded
            if (typeof google.maps.OverlayView === 'undefined') {
                await waitForOverlayView();
              }
        

    
            var styledMapType = new google.maps.StyledMapType(
                [
                  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                ],
                {name: 'Styled Map'},
                );
                
                
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProperties);
            map.mapTypes.set('styled_map', styledMapType);
        
            // Add zoom in and out controls
            addControls(map);
        
            if (checkDevice() === "Mobile Device") {
                console.log("mobile devce");
                map.setOptions({ zoom: 9.8  });
            } else {
                
               drawPolygon(map);
            }
            
            await fetch("https://visitmykuwait.co/api/v1/map-content")
                .then((response) => response.json())
                .then((data) => {
                    markers = [
                        ...markers,
                        ...addMarkers(data.articles, map, 'article'),
                        ...addMarkers(data.offers, map, 'offer'),
                        ...addMarkers(data.events, map, 'event')
                    ];
                }).catch((error) => alert("يرجي الانتظار حتي تحميل الخريطة"));
        
        
                /*
                */
               // Get reference to the filter buttons
        const eventsButton = document.getElementById('events-button');
        const offersButton = document.getElementById('offers-button');
        const articlesButton = document.getElementById('articles-button');
        const allButton = document.getElementById('all-button');
        
        // Add event listeners to each button
        eventsButton.addEventListener('click', () => {
            // Filter markers and only show events
            markers.forEach(marker => {
                if (marker.type === 'event') {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            });
        });
        
        offersButton.addEventListener('click', () => {
            // Filter markers and only show offers
            markers.forEach(marker => {
                if (marker.type === 'offer') {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            });
        });
        
        articlesButton.addEventListener('click', () => {
            // Filter markers and only show articles
            markers.forEach(marker => {
                if (marker.type === 'article') {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            });
        });
        
        allButton.addEventListener('click', () => {
           // Show all markers
           markers.forEach(marker => marker.setVisible(true));
        });
        
        // After initializing your map
        google.maps.event.addListener(map, 'click', function() {
            var sidebar = document.getElementById("sidebar");
            var mobilebar = document.getElementById("mobilebar");
        
            // Check if sidebars are active
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        
            if (mobilebar.classList.contains('active')) {
                mobilebar.classList.remove('active');
            }
        });
}

window.initialize = initialize;

// Rest of your code...
class CustomInfoWindow extends google.maps.OverlayView{
    constructor(position, content) {
      super();
      this.position = position;
      this.content = content;
    }
  
    onAdd() {
      this.div = document.createElement("div");
      this.div.style.borderStyle = "none";
      this.div.style.borderWidth = "0px";
      this.div.style.position = "absolute";
      this.div.innerHTML = this.content;
  
      let panes = this.getPanes();
      panes.floatPane.appendChild(this.div);
    }
  
    draw() {
      let overlayProjection = this.getProjection();
      let sw = overlayProjection.fromLatLngToDivPixel(this.position);
  
      let div = this.div;
      div.style.left = sw.x - div.offsetWidth / 2 + "px"; // Center horizontally
      div.style.top = sw.y - div.offsetHeight - 40 + "px"; // Position above marker
    }
  
    onRemove() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            delete this.div;
        }
    }
}

async function waitForOverlayView() {
  return new Promise((resolve) => {
    if (typeof google.maps.OverlayView !== 'undefined') {
        resolve();
    } else {
        const checkInterval = setInterval(() => {
          if (typeof google.maps.OverlayView !== 'undefined') {
              clearInterval(checkInterval);
              resolve();
          }
        }, 1000); // Check every 100ms
     }
   });
}








export function addMarkers(items, map, type) {
  let markers = [];

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let marker = new google.maps.Marker({
      position: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng || item.lang),
      },
      map: map,
      title: item.title,
      active: false,
      icon: {
        url: "map/images/blue pin point.svg",
        scaledSize:
          checkDevice() == "Mobile Device"
            ? new google.maps.Size(60, 60)
            : new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 30),
        labelOrigin: new google.maps.Point(15, 15),
        animation: google.maps.Animation.BOUNCE,
      },
      type, // Add the type here
    });

    google.maps.event.addListener(marker, "click", function () {
      if (activeMarker) {
        activeMarker.setIcon({
          url: "map/images/blue pin point.svg",
          scaledSize:
            checkDevice() == "Mobile Device"
              ? new google.maps.Size(60, 60)
              : new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 30),
          labelOrigin: new google.maps.Point(15, 15),
          animation: google.maps.Animation.BOUNCE,
        });
      }

      // Set the clicked marker as the active marker and change its icon to red
      activeMarker = marker;
      marker.setIcon({
        url: "map/images/red pin point.svg",
        scaledSize:
          checkDevice() == "Mobile Device"
            ? new google.maps.Size(60, 60)
            : new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 30),
        labelOrigin: new google.maps.Point(15, 15),
        animation: google.maps.Animation.BOUNCE,
      });

      var sidebar = document.getElementById("sidebar");
      const mobilebar = document.getElementById("mobilebar");

      sidebar.innerHTML = `
                    <div style="box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);">
                    <button class="close-sidebar-button">x</button>
                    <h1>${item.title}</h1>
                    

                    </div>
                    <div class="scrollable-content">


                    <img src="${item.cover}" style="border-radius: 15px;padding: 12px">

                    <p>${item.description}</p>                     
                    <p>${item.content}</p>

                    <a href="${item.url}" target='_blank'>استكشف المزيد</a>

                    </div>`;

      /*
                        <button class="icon-top" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);">
                        <img src="map/images/arrow_top.svg">
                    </button>
                    */
      mobilebar.innerHTML = `
                     <div class="mobilebar-header">
                     <h1>${item.title}</h1>
                     <div class="mobile-header-icons">
                     <button class="share-top" id ="shareBtn">
                           <img src="map/images/share.svg">
                     </button>
                 
  
                         <button class="close-sidebar-mobile">x</button>
                     </div>
                 </div>
                 
                     <div class="scrollable-content"> 
                     <div class="mobilebar-img-des">
                         <img src="${item.cover}" alt="Image">
                         </div>
                         <div class="mobilebar-des">
                             <p>${item.description}</p>
                         </div>

                         <div class="mobilbar-content">

                            <div class="mobilebar-con">
                                
                             </div>

                             <a href="${item.url}" target='_blank' class="mobilebar-button">استكشف المزيد</a>
                         </div> 
                     </div>`;

      if (checkDevice() === "Mobile Device") {
        mobilebar.classList.add("active");
      } else {
        sidebar.classList.add("active");
      }

      sidebar
        .querySelector(".close-sidebar-button")
        .addEventListener("click", () => {
          sidebar.classList.remove("active");
        });

      mobilebar
        .querySelector(".close-sidebar-mobile")
        .addEventListener("click", () => {
          mobilebar.classList.remove("active");
          mobilebar.classList.remove("full");
        });

      // /////////////////////////////////////////
      const iconTopButton = mobilebar.querySelector(".icon-top");
      if (iconTopButton) {
        iconTopButton.addEventListener("click", () => {
          mobilebar.classList.toggle("full");
        });
      }

      const shareBtn = document.querySelector("#shareBtn");
      if (shareBtn) {
        shareBtn.onclick = async function () {
          if (navigator.share) {
            const shareData = {
              title: item.title,
              text: item.title,
              url: item.url,
            };
            await navigator.share(shareData);
            console.log("Share Successful");
          } else {
            alert("Web Share not supported");
          }
        };
      }
    });
    ///////////////////////////////////////////////////////////////////

    marker.addListener("mouseover", function () {
      // Close any existing info window
      if (infoWindow) infoWindow.setMap(null);

      // Create a new custom info window

      var added_cin = "";
      if (marker.type == "offer") {
        if (item.phone) {
          added_cin =
            '<div class="marker-phone">' +
            '<i class="fa-solid fa-phone"></i>' +  
            "<p>" +
            item.phone +
            "</p>" +
            "</div>";
        }
      } else if (marker.type == "event") {
        added_cin =
          '<div class="marker-calendar">' +
          '<i class="fa-solid fa-calendar-days"></i>' +
          "<p>" +
          item.date +
          "</p>" +
          "</div>";
      } else if (marker.type == "article") {
        added_cin = "<p></p>";
      } else {
        added_cin = "<p></p>";
      }

      var contentString =
        '<div id="content-marker">' +
        "<h1>" +
        item.title +
        "</h1>" +
        '<div class="marker-location">' +
        '<i class="fa-solid fa-location-dot"></i>' + 
        "<p>Kuwait</p>" +
        "</div>" +
        added_cin +
        "</div>";

      infoWindow = new CustomInfoWindow(marker.getPosition(), contentString);
      infoWindow.setMap(map);
    });

    marker.addListener("mouseout", function () {
      if (infoWindow) infoWindow.setMap(null);
    });
    markers.push(marker);
  }
  return markers;
}
