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
                anchor: new google.maps.Point(15, 30),
                labelOrigin: new google.maps.Point(15, 15),
                
            },
            type // Add the type here
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
                    `
                    
                    <div class="mobilebar-header">
                        <h1>${item.title}</h1>
                        <div class="mobile-header-icons">
                           <button class="icon-top">
                               <img src="images/arrow_top.svg">
                           </button>
                           <button class="close-sidebar-mobile">x</button>
                        </div>
                    </div>
                    
                      <div class="mobilebar-img-des">
                      <img src="${item.cover}" alt="Image" style="border-radius: 15px;padding: 12px">


                      <div class="mobilebar-des">
                          <p>${item.description}</p>
                      </div>
                      </div>

                    <div class="mobilbar-content">

                      <div class="mobilebar-con">
                            <p>${item.content}</p>
                      </div>
                          <a href="${item.url}" target='_blank' class="mobilebar-button">استكشف المذيد</a>
                    </div>
                      
                    `; 

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
                    mobilebar.classList.remove("full"); 
                });

// /////////////////////////////////////////
                const iconTopButton = mobilebar.querySelector('.icon-top');
                if (iconTopButton) { 
                  iconTopButton.addEventListener('click', () => {
                      mobilebar.classList.toggle('full');
                  });
                }

            }
        );
        markers.push(marker);
    }
    return markers;
}








// ////////////////////////////////////////








// const iconTops = document.querySelectorAll('.icon-top');


// iconTops.forEach(iconTop => {
//     iconTop.addEventListener('click', function() {

//         const parentElement = this.parentNode; 

      
//         parentElement.style.height = '100%';
//     });
// });