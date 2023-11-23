// Description: This file contains the code to initialize the google map.
import { mapProperties } from './mapConfig.js';
import { drawPolygon } from './drawPolygon.js';
import { addMarkers } from './markers.js'; // Import addMarkers function
import { checkDevice } from './responsive_phone.js';

let markers = []; // Array to store the markers

async function initialize() {
    // Initialize the map
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProperties);
    // --------------------------------------------------------------------------------------//

    // Fetch the data from the JSON file and pass it to the drawPolygon function
    // --------------------------------------------------------------------------------------//
    // if mobile dno't draw polygon
    /*
    if (checkDevice() === "Mobile Device") {
        console.log("mobile devce");
        map.setOptions({ zoom: 9.8  });
    } else {
        */
        fetch(
            "https://raw.githubusercontent.com/Elghandour-eng/Kuwait-Coordinates/main/kw-coor.json"
        )
            .then((response) => response.json())
            .then((data) => drawPolygon(data, map)) // Pass map as an argument
            .catch((error) => alert("يرجي الانتظار حتي تحميل الخريطة"));
    //}
    //--------------------------------------------------------------------------------------//

    // Fetch data initially without any filters
    await fetch("https://visitmykuwait.co/api/v1/map-content")
        .then((response) => response.json())
        .then((data) => {
            markers = [
                ...markers,
                ...addMarkers(data.articles, map), // Pass map as an argument
                ...addMarkers(data.offers, map),   // Pass map as an argument
                ...addMarkers(data.events, map)    // Pass map as an argument
            ];
        }).catch((error) => alert("يرجي الانتظار حتي تحميل الخريطة"));
    
}

window.initialize = initialize;
