// Description: This file contains the code to initialize the google map.
import { mapProperties } from './mapConfig.js';
import { drawPolygon } from './drawPolygon.js';
import { addMarkers } from './markers.js'; // Import addMarkers function
import { checkDevice } from './responsive_phone.js';

let markers = []; // Array to store the markers

async function fetchData() {
    try {
        const response1 = await fetch("https://raw.githubusercontent.com/Elghandour-eng/Kuwait-Coordinates/main/kw-coor.json");
        const data1 = await response1.json();

        const response2 = await fetch("https://visitmykuwait.co/api/v1/map-content");
        const data2 = await response2.json();

        return { polygonData: data1, markerData: data2 };
    } catch (error) {
        alert("يرجي الانتظار حتي تحميل الخريطة");
    }
}

function initialize(data) {
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProperties);

    if (checkDevice() === "Mobile Device") {
        console.log("mobile devce");
        map.setOptions({ zoom: 9.8 });
    } else {
        drawPolygon(data.polygonData, map);
    }

    markers = [
      ...markers,
      ...addMarkers(data.markerData.articles, map),
      ...addMarkers(data.markerData.offers, map),
      ...addMarkers(data.markerData.events, map)
    ];
}

fetchData().then(initialize);

google.maps.event.addDomListener(window, 'load', initialize);