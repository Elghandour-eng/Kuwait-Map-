import { checkDevice } from "./responsive_phone.js";




//let infoWindow;
let activeMarker = null;

export function addMarkers(items, map, type) {
  let markers = [];

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let marker = new google.maps.Marker({
      position: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng || item.lang),
      },
      map: map,
      title: item.title,
      active: false,
      icon: {
        url: "map/images/blue pin point.svg",
        scaledSize:
          checkDevice() == "Mobile Device"
            ? new google.maps.Size(60, 60)
            : new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 30),
        labelOrigin: new google.maps.Point(15, 15),
        animation: google.maps.Animation.BOUNCE,
      },
      type, // Add the type here
    });

    google.maps.event.addListener(marker, "click", function () {
      if (activeMarker) {
        activeMarker.setIcon({
          url: "map/images/blue pin point.svg",
          scaledSize:
            checkDevice() == "Mobile Device"
              ? new google.maps.Size(60, 60)
              : new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 30),
          labelOrigin: new google.maps.Point(15, 15),
          animation: google.maps.Animation.BOUNCE,
        });
      }

      // Set the clicked marker as the active marker and change its icon to red
      activeMarker = marker;
      marker.setIcon({
        url: "map/images/red pin point.svg",
        scaledSize:
          checkDevice() == "Mobile Device"
            ? new google.maps.Size(60, 60)
            : new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 30),
        labelOrigin: new google.maps.Point(15, 15),
        animation: google.maps.Animation.BOUNCE,
      });

      var sidebar = document.getElementById("sidebar");
      const mobilebar = document.getElementById("mobilebar");

      sidebar.innerHTML = `
                    <div style="box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);">
                    <button class="close-sidebar-button">x</button>
                    <h1>${item.title}</h1>
                    

                    </div>
                    <div class="scrollable-content">


                    <img src="${item.cover}" style="border-radius: 15px;padding: 12px">

                    <p>${item.description}</p>                     
                    <p>${item.content}</p>

                    <a href="${item.url}" target='_blank'>استكشف المزيد</a>

                    </div>`;



      /*
                        <button class="icon-top" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);">
                        <img src="map/images/arrow_top.svg">
                    </button>
                    */
      mobilebar.innerHTML = `
                     <div class="mobilebar-header">
                     <h1>${item.title}</h1>
                     <div class="mobile-header-icons">
                     <button class="share-top" id ="shareBtn">
                           <img src="map/images/share.svg">
                     </button>
                 
  
                         <button class="close-sidebar-mobile">x</button>
                     </div>
                 </div>
                 
                     <div class="scrollable-content"> 
                     <div class="mobilebar-img-des">
                         <img src="${item.cover}" alt="Image">
                         </div>
                         <div class="mobilebar-des">
                             <p>${item.description}</p>
                         </div>

                         <div class="mobilbar-content">

                            <div class="mobilebar-con">
                                
                             </div>

                             <a href="${item.url}" target='_blank' class="mobilebar-button">استكشف المزيد</a>
                         </div> 
                     </div>`;

      if (checkDevice() === "Mobile Device") {
        mobilebar.classList.add("active");
      } else {
        sidebar.classList.add("active");
      }

      sidebar
        .querySelector(".close-sidebar-button")
        .addEventListener("click", () => {
          sidebar.classList.remove("active");
        });

      mobilebar
        .querySelector(".close-sidebar-mobile")
        .addEventListener("click", () => {
          mobilebar.classList.remove("active");
          mobilebar.classList.remove("full");
        });

      // /////////////////////////////////////////
      const iconTopButton = mobilebar.querySelector(".icon-top");
      if (iconTopButton) {
        iconTopButton.addEventListener("click", () => {
          mobilebar.classList.toggle("full");
        });
      }

      const shareBtn = document.querySelector("#shareBtn");
      if (shareBtn) {
        shareBtn.onclick = async function () {
          if (navigator.share) {
            const shareData = {
              title: item.title,
              text: item.title,
              url: item.url,
            };
            await navigator.share(shareData);
            console.log("Share Successful");
          } else {
            alert("Web Share not supported");
          }
        };
      }

    
      
    });
    ///////////////////////////////////////////////////////////////////

    /* marker.addListener("mouseover", function () {
      // Close any existing info window
      if (infoWindow) infoWindow.setMap(null);

      // Create a new custom info window

      var added_cin = "";
      if (marker.type == "offer") {
        if (item.phone) {
          added_cin =
            '<div class="marker-phone">' +
            '<i class="fa-solid fa-phone"></i>' +  
            "<p>" +
            item.phone +
            "</p>" +
            "</div>";
        }
      } else if (marker.type == "event") {
        added_cin =
          '<div class="marker-calendar">' +
          '<i class="fa-solid fa-calendar-days"></i>' +
          "<p>" +
          item.date +
          "</p>" +
          "</div>";
      } else if (marker.type == "article") {
        added_cin = "<p></p>";
      } else {
        added_cin = "<p></p>";
      }

      var contentString =
        '<div id="content-marker">' +
        "<h1>" +
        item.title +
        "</h1>" +
        '<div class="marker-location">' +
        '<i class="fa-solid fa-location-dot"></i>' + 
        "<p>Kuwait</p>" +
        "</div>" +
        added_cin +
        "</div>";

      infoWindow = new CustomInfoWindow(marker.getPosition(), contentString);
      infoWindow.setMap(map);
    });

    marker.addListener("mouseout", function () {
      if (infoWindow) infoWindow.setMap(null);
    });  */
    markers.push(marker);
  }
  return markers;
}
