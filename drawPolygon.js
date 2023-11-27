export  async function drawPolygon(map) {
    let polygons = [];

    try {
        const response = await fetch('https://raw.githubusercontent.com/Elghandour-eng/Kuwait-Coordinates/main/kuwait-detailed-boundary_953.geojson');
        const data = await response.json();

        data.features.forEach(feature => {
            feature.geometry.coordinates.forEach(polygonCoords => {
                // Convert coordinates from [lng, lat] to {lat, lng}
                const paths = polygonCoords[0].map(coord => ({
                    lat: coord[1],
                    lng: coord[0]
                }));

                let polygon = new google.maps.Polygon({
                    paths,
                    strokeColor: "#7cdfcb",
                    strokeOpacity: 0.9,
                    strokeWeight: 0,
                    fillColor: "#000000", // Initial fill color is black
                    fillOpacity: 0, // Initial fill opacity is 0 (transparent)
                });

                polygons.push(polygon);


                polygon.addListener("mouseover", () => {
                    polygons.forEach(poly => poly.setOptions({ fillColor:"#7cdfcb", fillOpacity: .2 }));
                });

                polygon.addListener("mouseout", () => {
                    polygons.forEach(poly => poly.setOptions({ fillColor:"#000000", fillOpacity: 0 }));
                });
                polygon.addListener("click", () => {
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
                

                polygon.setMap(map);
            });
        });
    } catch (error) {
        // Handle error
        console.error(error);
    }
}