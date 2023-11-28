class CustomInfoWindow extends OverlayView {
    constructor(position, content) {
      super();
      this.position = position;
      this.content = content;
    }
  
    onAdd() {
      this.div = document.createElement("div");
      this.div.style.borderStyle = "none";
      this.div.style.borderWidth = "0px";
      this.div.style.position = "absolute";
      this.div.innerHTML = this.content;
  
      let panes = this.getPanes();
      panes.floatPane.appendChild(this.div);
    }
  
    draw() {
      let overlayProjection = this.getProjection();
      let sw = overlayProjection.fromLatLngToDivPixel(this.position);
  
      let div = this.div;
      div.style.left = sw.x - div.offsetWidth / 2 + "px"; // Center horizontally
      div.style.top = sw.y - div.offsetHeight - 40 + "px"; // Position above marker
    }
  
    onRemove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        delete this.div;
      }
    }
  }