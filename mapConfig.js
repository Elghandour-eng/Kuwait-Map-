import { checkDevice } from './responsive_phone.js';


export var mapProperties = {
  center: { lat: 29.3759, lng: 47.9774 }, // Centered at Kuwait
  zoom: (checkDevice() === "Mobile Device") ? 10 : 7.5,
  mapId: (checkDevice() === "Mobile Device") ? "13c8646847f68c72" : "6f5b7f86f2745f19",
  disableDefaultUI: true,
  minZoom: 7,
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
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#d3d3d3" }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        { "color": "#808080" },
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "on" },
        { "color": "#b3b3b3" }
      ]
    },
    // More style rules here as needed.
  ], 
};