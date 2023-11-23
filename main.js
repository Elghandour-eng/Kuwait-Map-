import { mapProperties } from './mapConfig.js';
import { drawPolygon } from './drawPolygon.js';
import { addMarkers } from './markers.js'; // Import addMarkers function

let markers = []; // Array to store the markers

async function fetchDataAndInitialize() {
    try {
        const response1 = await fetch("https://raw.githubusercontent.com/Elghandour-eng/Kuwait-Coordinates/main/kw-coor.json");
        const polygonData = await response1.json();

        const response2 = await fetch("https://visitmykuwait.co/api/v1/map-content");
        const markerData = await response2.json();

        initialize(polygonData, markerData);
    } catch (error) {
        alert("يرجي الانتظار حتي تحميل الخريطة");
    }
}

function initialize(polygonData, markerData) {
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProperties);

    drawPolygon(polygonData, map);

    markers = [
        ...markers,
        ...addMarkers(markerData.articles, map),
        ...addMarkers(markerData.offers, map),
        ...addMarkers(markerData.events, map)
    ];
}

google.maps.event.addDomListener(window, 'load', fetchDataAndInitialize);