// markers.js

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

        google.maps.event.addListener(
            marker,
            "click",
            function () {
                const sidebar = document.getElementById("sidebar");
                sidebar.innerHTML =
                    `<h1>${item.title}</h1>
                     <img src="${item.cover}">
                     <p>${item.description}</p>
                     <a href="${item.url}" target='_blank'>استكشف المذيد</a>`;

                const mobilebar = document.getElementById("mobilebar");
                mobilebar.innerHTML =
                    `<h1>${item.title}</h1>
                      <img src="${item.cover}">
                      <p>${item.description}</p>
                      <a href="${item.url}" target='_blank'>استكشف المذيد</a>`;     

                // Check if device is mobile
                if (checkDevice() === "Mobile Device") {
                    // Add the "active" and "mobile" classes to the sidebar
                    mobilebar.classList.add("active");
                } else {
                    // Add only the "active" class to the sidebar
                    sidebar.classList.add("active");
                }
                            // Create a button to close the sidebar
                const closeButtonSidebar = document.createElement("button");
                closeButtonSidebar.textContent = "x";
                closeButtonSidebar.classList.add("close-sidebar-button"); 

                // Create a button to close the mobilebar
                const closeButtonMobilebar = document.createElement("button");
                closeButtonMobilebar.textContent = "x";
                closeButtonMobilebar.classList.add("close-sidebar-mobile"); 

                // Add event listeners to both buttons
                closeButtonSidebar.addEventListener("click", () => {
                    // Remove "active" class from sidebar when closing it
                    sidebar.classList.remove("active");
                });

                closeButtonMobilebar.addEventListener("click", () => {
                    // Remove "active" class from mobilebar when closing it
                    mobilebar.classList.remove("active"); 
                });

    // Append the close buttons to their respective sidebars
    sidebar.appendChild(closeButtonSidebar);
    mobilebar.appendChild(closeButtonMobilebar);
            }
        );
        markers.push(marker);
    }
    return markers;
}