export default async function CustomInfoWindow(position, content) {
    google.maps.OverlayView.call(this);
    this.position = position;
    this.content = content;
}

CustomInfoWindow.prototype = Object.create(google.maps.OverlayView.prototype);

CustomInfoWindow.prototype.onAdd = function() {
    this.div = document.createElement('div');
    this.div.style.borderStyle = 'none';
    this.div.style.borderWidth = '0px';
    this.div.style.position = 'absolute';
    this.div.innerHTML = this.content;

    var panes = this.getPanes();
    panes.floatPane.appendChild(this.div);
};

CustomInfoWindow.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this.position);

    var div = this.div;
    div.style.left = (sw.x - div.offsetWidth / 2) + 'px'; // Center horizontally
    div.style.top = (sw.y - div.offsetHeight - 40) + 'px'; // Position above marker
};

CustomInfoWindow.prototype.onRemove= function() {
if (this.div) {
    this.div.parentNode.removeChild(this.div);
    delete this.div;
}
};