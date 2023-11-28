import { mapProperties } from './mapConfig.js';
import { drawPolygon } from './drawPolygon.js';
import { checkDevice } from './responsive_phone.js';
import { addControls } from './controls.js';
import { addMarkers } from './markers.js';

let markers = []; 




export  async function initialize() {

    

                
                
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProperties);
        
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
/*
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

function waitForOverlayView() {
    return new Promise(resolve => {
      const check = () => {
        if (typeof google.maps.OverlayView !== 'undefined') {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
  
      check();
    });
  }



*/





