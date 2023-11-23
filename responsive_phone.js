export function checkDevice() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for mobile devices
    if (/windows phone/i.test(userAgent) || /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
        return "Mobile Device";
    }

    // If not found any mobile device then it's a browser
    else {
        return "Browser";
    }
}

