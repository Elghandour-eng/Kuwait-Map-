// main.js

import { mapProperties } from './mapConfig.js';
import { drawPolygon } from './drawPolygon.js';
import { addMarkers } from './markers.js'; 
import { checkDevice } from './responsive_phone.js';
import { addControls } from './controls.js';


let markers = []; 

async function initialize() {

        // Check if google.maps.OverlayView is loaded
        overlay = new google.maps.OverlayView();


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