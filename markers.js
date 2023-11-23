import { checkDevice } from './responsive_phone.js';

export function addMarkers(items, map) {
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

            }
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
                     <a href="${item.url}" target='_blank'>Ø§ÙƒØªØ´Ù Ø§Ù„Ù…Ø²ÙŠØ¯</a>`;

                // Check if device is mobile
                if (checkDevice() === "Mobile Device") {
                    // Add the "active" and "mobile" classes to the sidebar
                    sidebar.classList.add("active", "mobile");
                } else {
                    // Add only the "active" class to the sidebar
                    sidebar.classList.add("active");
                }

                // Create a button to close the sidebar
                const closeButton = document.createElement("button");
                closeButton.textContent = "x";
                closeButton.classList.add("close-sidebar-button"); 
                
                closeButton.addEventListener("click", () => {
                    // Remove both "active" and "mobile" classes from the sidebar when closing it
                    sidebar.classList.remove("active", "mobile");
                });

                // Append the close button to the sidebar
                document.getElementById("sidebar").appendChild(closeButton);
            }
        );
        markers.push(marker);
    }
    return markers;
}

