function initMap() {
    var uluru = {lat: 55.135345, lng: 61.465941};
    var target = {lat: 55.135422, lng: 61.464431}; 
    var map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 17,
        center: target,
        disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}