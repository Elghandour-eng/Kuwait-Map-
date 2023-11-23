import { checkDevice } from './responsive_phone.js';


export var mapProperties = {
    center: { lat: 29.3759, lng: 47.9774 }, // Centered at Kuwait
    zoom: 7.2,
    mapId: (checkDevice() === "Mobile Device") ? "13c8646847f68c72" : "6f5b7f86f2745f19",
    disableDefaultUI: true,
    minZoom: 8 - 2,
    restriction: {
        latLngBounds: {
            north: 30.095, // Kuwait north
            south: 28.524, // Kuwait south
            west: 46.372, // Kuwait west
            east: 48.421 // Kuwait east
        },
    },
    styles:[ 
        {
          featureType:"all",
          stylers:[
            {saturation:-80}
          ]
        }
      ]  
    
};