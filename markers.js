import { checkDevice } from './responsive_phone.js';

export function addMarkers(items, map, type) {
    let markers = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let marker = new google.maps.Marker({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng || item.lang) },
            map: map,
            title: item.title,
            icon: {
                url: "map/images/marker.svg",
                scaledSize: checkDevice() == "Mobile Device" ?  new google.maps.Size(60, 60) : new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
            },
            type // Add the type here
        });

        var infowindow = new google.maps.InfoWindow({
          content: 'Your content string',
          closeBoxURL: "", // this will remove close ('x') button.
          disableAutoPan: true 
        });

        marker.addListener("mouseover", () => {
            infowindow.open(map, marker);
        });

        marker.addListener("mouseout", () => {
            infowindow.close(map, marker);
        });

        google.maps.event.addListener(
            marker,
            "click",
            function () {
                var sidebar = document.getElementById("sidebar");
                const mobilebar = document.getElementById("mobilebar");

                sidebar.innerHTML =
                    `<button class="close-sidebar-button">x</button>
                     <h1>${item.title}</h1>
                     <img src="${item.cover}" style="border-radius: 15px;padding: 12px">
                     <p>${item.description}</p>
                     <p>${item.content}</p>
                     <a href="${item.url}" target='_blank'>استكشف المذيد</a>`;

                mobilebar.innerHTML =
                    `<button class="close-sidebar-mobile">x</button>
                     <h1>${item.title}</h1>
                    
                    <img src="${item.cover}" alt="Image" style="border-radius: 15px;padding: 12px">
                
                      <p>${item.description}</p>
                      <p>${item.content}</p>
                      <a href="${item.url}" target='_blank'>استكشف المذيد</a>`;     

                if (checkDevice() === "Mobile Device") {
                    mobilebar.classList.add("active");
                } else {
                    sidebar.classList.add("active");
                }

                sidebar.querySelector(".close-sidebar-button").addEventListener("click", () => {
                    sidebar.classList.remove("active");
                });

                mobilebar.querySelector(".close-sidebar-mobile").addEventListener("click", () => {
                    mobilebar.classList.remove("active"); 
                });
            }
        );
        markers.push(marker);
    }
    return markers;
}