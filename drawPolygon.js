// Description: This file contains the function to draw the polygon on the map.

function drawPolygon(data, map) { // Receive map as a parameter
    var triangleCoords = [];
    data.geometry.features[0].geometry.coordinates[0].forEach(function (coord) {
        triangleCoords.push({ lat: coord[1], lng: coord[0] });
    });

    var bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "transparent",
        strokeOpacity: 1,
        strokeWeight: 0,
        fillColor: "#7cdfcb",
        fillOpacity: 0,
    });

    bermudaTriangle.setMap(map);

    bermudaTriangle.addListener("mouseover", function () {
        this.setOptions({ fillColor: "#7cdfcb", fillOpacity: 0.35 }); // Use 'this' to refer to the polygon
    });

    bermudaTriangle.addListener("mouseout", function () {
        this.setOptions({ fillColor: "transparent", fillOpacity: 0 }); // Use 'this' to refer to the polygon
    });
}

export { drawPolygon };